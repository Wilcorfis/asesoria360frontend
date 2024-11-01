import { Routes } from '@angular/router';
import { LoginComponent } from './login-form/login-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path:'listarusuario',
        loadComponent:()=>import('./usuario-list/usuario-list.component')

    },
   
    { path: '', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },



    {path:'nuevousuario',
        loadComponent:()=>import('./usuario-form/usuario-form.component')

    }, 
    {path:':id/editarusuario',
        loadComponent:()=>import('./usuario-form/usuario-form.component')

    },
    {path:'listarhorario',
        loadComponent:()=>import('./horario-list/horario-list.component')

    },
    {path:'nuevohorario',
        loadComponent:()=>import('./horario-form/horario-form.component')

    }, 
    {path:':id/editarhorario',
        loadComponent:()=>import('./horario-form/horario-form.component')

    }, 
    {path:'listarasignatura',
        loadComponent:()=>import('./asignatura-list/asignatura-list.component')

    },
    {path:'nuevoasignatura',
        loadComponent:()=>import('./asignatura-form/asignatura-form.component')

    }, 
    {path:':id/editarasignatura',
        loadComponent:()=>import('./asignatura-form/asignatura-form.component')

    }, 
    {path:'listarasesoria',
        loadComponent:()=>import('./asesoria-list/asesoria-list.component')

    },
    {path:'listarasesoriatutor',
        loadComponent:()=>import('./asesoria-tutor/asesoria-tutor.component')

    },
    {path:'listarasesoriaestudiante',
        loadComponent:()=>import('./asesoria-estudiante/asesoria_estudiante.component')

    },
    {path:'nuevoasesoria',
        loadComponent:()=>import('./asesoria-form/asesoria-form.component')

    }, 
    {path:':id/editarasesoria',
        loadComponent:()=>import('./asesoria-form/asesoria-form.component')

    }, 
    {path:'listarsuscripcionasesoria',
        loadComponent:()=>import('./suscripcionasesoria-list/suscripcionasesoria-list.component')

    },//nuevosuscripcionasesoria
    {path:':id/suscripcionasesoria',
        loadComponent:()=>import('./suscripcionasesoria-form/suscripcionasesoria-form.component')

    }, 
    {path:':id/editarsuscripcionasesoria',
        loadComponent:()=>import('./suscripcionasesoria-form/suscripcionasesoria-form.component')

    }, 
    {path:'listarretroalimentacion',
        loadComponent:()=>import('./retroalimentacion-list/retroalimentacion-list.component')

    },
    {path:'nuevoretroalimentacion',
        loadComponent:()=>import('./retroalimentacion-form/retroalimentacion-form.component')

    }, 
    {path:':id/editarretroalimentacion',
        loadComponent:()=>import('./retroalimentacion-form/retroalimentacion-form.component')

    }, 
    {path:'listarnotificacion',
        loadComponent:()=>import('./notificacion-list/notificacion-list.component')

    },
    {path:'nuevonotificacion',
        loadComponent:()=>import('./notificacion-form/notificacion-form.component')

    }, 
    {path:':id/editarnotificacion',
        loadComponent:()=>import('./notificacion-form/notificacion-form.component')

    },  

];
