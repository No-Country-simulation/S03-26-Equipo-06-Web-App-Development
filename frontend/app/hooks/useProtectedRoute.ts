'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUserRole, isTokenExpired } from "@/utils/auth"

export function useProtectedRoute(allowedRoles: string[]) {
  const router = useRouter();

  useEffect(() => {
    const role = getUserRole();

    if (!role || isTokenExpired()) {
      localStorage.removeItem('token');
      router.replace('/ingresar');
      return
    }

    if (!allowedRoles.includes(role)) {
      router.replace('/');
    }
  }, [router, allowedRoles]);
}
