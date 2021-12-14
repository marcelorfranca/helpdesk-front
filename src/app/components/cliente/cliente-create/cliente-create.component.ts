import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    id:         '',
    nome:       '',
    cpf:        '',
    email:      '',
    senha:      '',
    perfis:     [],
    dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, [Validators.minLength(3), Validators.maxLength(30)]);

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router ) { }

  ngOnInit(): void {
  }

  
  create(): void {
    this.service.create(this.cliente).subscribe(() => {
      this.toast.success('Cliente cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['clientes'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
          console.log(ex);
        });
      } else {
        this.toast.error(ex.error.message);
        console.log(ex);
      }
    })
  }
  
  addPerfil(perfil: any): void {
    if(this.cliente.perfis.includes(perfil)) { /* includes similar ao contains do java */
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1); /* removendo caso ja esteja na lista do checked */
    } else {
      this.cliente.perfis.push(perfil); /*inserir na lista*/
    }
  }

  validaCampos(): boolean { /** identificar para desabilitar ou habi botão */
    return this.nome.valid && this.cpf.valid 
     && this.email.valid && this.senha.valid
  }
  
}
