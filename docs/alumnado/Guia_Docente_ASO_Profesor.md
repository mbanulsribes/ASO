    # 🧑‍🏫 Guía de Planificación Docente ASO - 26/27 (València)

**Contexto:** Lunes (2h) y Martes (2h). Curso intensivo (finaliza en marzo por FCT). Alta incidencia de festivos en lunes y martes.

## 🧠 Estrategia Metodológica Recomendada
- **Lunes (2h) -> "Teoría Aplicada y Resolución":** Resolución de bloqueos técnicos de la práctica del fin de semana. Presentación del nuevo concepto. Demostración práctica en el proyector.
- **Martes (2h) -> "Hands-on Lab":** Alumnos trabajando directamente en su entorno Proxmox. El profesor actúa como soporte técnico (resolución de dudas in situ). Al final de la sesión se plantea la práctica evaluable semanal (entrega el domingo).

## 🗓️ Calendario Detallado Lunes/Martes

### 1ª EVALUACIÓN (Aprox. 44 horas efectivas)
*   **Semana 1 (14-15 Sep):** UT 0. Presentación del módulo. Instalación de Proxmox en los equipos físicos del aula.
*   **Semana 2 (21-22 Sep):** UT 0. Creación de redes virtuales y plantillas (Ubuntu Server y Windows Server).
*   **Semana 3 (28-29 Sep):** UT 1. Bash Scripting (I) - Sintaxis, variables, tuberías, `grep`, `awk`.
*   **Semana 4 (5-6 Oct):** UT 1. Bash Scripting (II) - Estructuras de control (if/for/while), scripts de backup.
*   **Semana 5 (13 Oct):** UT 1. Bash Scripting (III) - *⚠️ 12 Octubre (Lunes) Festivo.* Expresiones regulares.
*   **Semana 6 (19-20 Oct):** UT 2. PowerShell (I) - Filosofía de obsjetos, cmdlets básicos.
*   **Semana 7 (26-27 Oct):** UT 2. PowerShell (II) - Pipelines, filtrado, formateo de salida.
*   **Semana 8 (2-3 Nov):** UT 2. PowerShell (III) - *⚠️ Posible puente el 2 Nov.* Scripts de administración Wintel.
*   **Semana 9 (9-10 Nov):** UT 3. Acceso Remoto (I) - SSH avanzado, claves asimétricas, transferencia SCP.
*   **Semana 10 (16-17 Nov):** UT 3. Acceso Remoto (II) - RDP, túneles SSH y seguridad perimetral básica.
*   **Semana 11 (23-24 Nov):** UT 4. Directorios (I) - Instalación Windows Server, roles básicos, promoción a Controlador de Dominio.
*   **Semana 12 (30 Nov - 1 Dic):** UT 4. Directorios (II) - Unión de clientes Windows al dominio y estructura organizativa.
*   **Semana 13 (7-8 Dic):** *⚠️ SEMANA EN BLANCO. Puente Constitución/Inmaculada.* 
*   **Semana 14 (14-15 Dic):** **EXAMEN PRÁCTICO 1ª EV.** Reto en máquina virtual (Scripting + Acceso Remoto).
*   **Semana 15 (21-22 Dic):** Correcciones, entrega de notas y dejar laboratorios estables para enero. *(23 Dic inician vacaciones)*.

### 2ª EVALUACIÓN (Aprox. 36 horas efectivas)
*   **Semana 16 (11-12 Ene):** UT 4. Directorios (III) - GPOs, Scripts de inicio de sesión, alta masiva de usuarios vía CSV.
*   **Semana 17 (18-19 Ene):** UT 4. Directorios (IV) - Perfiles móviles y resolución de problemas AD.
*   **Semana 18 (25-26 Ene):** UT 5. Integración (I) - Compartición de recursos heterogéneos (Samba y NFS).
*   **Semana 19 (1-2 Feb):** UT 5. Integración (II) - Integración de Linux (Ubuntu) para autenticar contra Active Directory.
*   **Semana 20 (8-9 Feb):** UT 6 y 7. Exprés - Gestión de procesos (htop, ps), crontab, instalación rápida de Dashboard de métricas.
*   **Semana 21 (15-16 Feb):** UT 8. Docker (I) - Fundamentos, imágenes, ciclo de vida del contenedor y volúmenes (persistencia).
*   **Semana 22 (22-23 Feb):** UT 8. Docker (II) - Redes en Docker y construcción con Dockerfiles.
*   **Semana 23 (1-2 Mar):** UT 8. Docker (III) - Docker Compose. Despliegue de un stack completo (ej. Nextcloud/WordPress + DB).
*   **Semana 24 (8-9 Mar):** **EXAMEN PRÁCTICO 2ª EV.** Reto global integrador (Despliegue Docker + Autenticación).
*   **Semana 25 (15-16 Mar):** *⚠️ SEMANA FALLERA.* Días no lectivos/irregulares. Uso para recuperaciones o preparación FCT.
*   **A partir del 22 Mar:** Inicio de FCT (Prácticas en empresa) y Proyecto Intermodular.

## 🚦 Puntos Críticos de Gestión (Red Flags)
1. **El "Pozo" de VirtualBox:** Si en clase se pierde tiempo configurando adaptadores puente en VirtualBox, se acumulará retraso imposible de recuperar. Instalar Proxmox nativo en la UT0 te ahorrará semanas de problemas de red.
2. **Puente de Diciembre:** Corta por la mitad el bloque de Active Directory. Recuerda a los alumnos que apunten bien las contraseñas de Administrador del Dominio antes de irse de puente.
3. **El tiempo de Docker:** Es innegociable llegar a Docker a mediados de febrero. Es la tecnología que más usarán en su Proyecto Final. Si vas con retraso, recorta temario de la UT6 (Procesos) e inviértelo en la UT8.
