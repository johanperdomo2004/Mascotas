import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const protectRoutes = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/'); // Redirigir a la página de inicio de sesión si no hay token
      }
    }, [router]);

    // Mientras verificamos la autenticación
    return localStorage.getItem('token') ? <WrappedComponent {...props} /> : null;
  };
};




