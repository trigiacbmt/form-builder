import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'form',
    pathMatch: 'full',
  },
  {
      path: 'form',
      children: [
          {
              path: '',
              redirectTo: 'builder',
              pathMatch: 'full',
          },
          {
              path: 'builder',
              loadComponent: () => import('./components/form-builder/form-builder.component').then(m => m.FormBuilderComponent)
          },
          {
              path: 'review',
              loadComponent: () => import('./components/review/review.component').then(m => m.AppReviewComponent)
          }
      ],
  },
];

export default appRoutes;
