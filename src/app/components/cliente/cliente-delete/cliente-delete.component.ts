import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  cliente: Cliente = {
    id:         '',
    nome:       '',
    cpf:        '',
    email:      '',
    senha:      '',
    perfis:     [],
    dataCriacao: ''
  }

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute, /* ele pega um parametro na URL, no caso o id */
     ) { }

  ngOnInit(): void { /* componente que se inicia */
    this.cliente.id = this.route.snapshot.paramMap.get('id'); /* ele acessa a URL e pega o id - esse id é o mesmo do app-routing*/
    this.findById();
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(resposta => {
      resposta.perfis = []
      this.cliente = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.cliente.id).subscribe(() => {
      this.toast.success('Cliente deletado com sucesso', 'Deletar');
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
  
}
