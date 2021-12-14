export interface Cliente {
    id?:           any; /** pode ser Integer ou String */
    nome:       String;
    cpf:        String;
    email:      String;
    senha:      String;
    perfis:   String[];
    dataCriacao:   any;

}