import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Récupérer le token dans le localStorage
  const token = localStorage.getItem('token');

  // Si le token existe, on clone la requête et on ajoute le header Authorization
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  // Sinon, on laisse passer la requête sans token
  return next(req);
};