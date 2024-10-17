import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',
        loadComponent:()=>import('./usuario-list/usuario-list.component')

    },
    {path:'new',
        loadComponent:()=>import('./usuario-form/usuario-form.component')

    }, 
    {path:':id/edit',
        loadComponent:()=>import('./usuario-form/usuario-form.component')

    }, 

];
