---
title: "Examen · 1.ª Evaluación · ASO"
description: "2.º ASIR · Administración de Sistemas Operativos"
---

# 📝 Examen · 1.ª Evaluación

**Módulo:** Administración de Sistemas Operativos  
**Curso:** 2.º ASIR  
**Duración:** 120 minutos  
**Puntuación:** 10 puntos

---

## Indicaciones

!!! info "Entorno"
    Dispones de las máquinas de laboratorio utilizadas durante la evaluación:

    - Ubuntu Server.
    - Windows Server.
    - Acceso a Proxmox cuando sea necesario.

- Puedes utilizar la ayuda integrada de los sistemas (`Get-Help`, `--help`, etc.).
- No se evalúa memorizar rutas de menús exactas si puedes realizar correctamente la tarea.
- Debes **comprobar** los resultados de las operaciones.
- Cuando se pida justificar, una captura sin explicación no es suficiente.
- Si una tarea no puede completarse por una incidencia del entorno, documenta las pruebas realizadas y el diagnóstico.

!!! warning "Importante"
    No modifiques configuraciones ajenas al ejercicio ni elimines snapshots proporcionados.

---

# Caso: incorporación a Llevant Sistemas

Te incorporas al equipo de administración de **Llevant Sistemas**. Antes de entregar dos servidores al departamento de desarrollo debes revisar el laboratorio, automatizar dos tareas, comprobar el acceso remoto y dejar preparada una estructura básica de dominio.

---

# 1. Diagnóstico del laboratorio — 1 punto

Las dos máquinas están conectadas al mismo bridge de Proxmox.

Obtienes:

```text
Ubuntu Server
IP: 192.168.50.20/24

Windows Server
IP: 192.168.60.30/24
```

El `ping` entre ambas falla.

## 1.1

Explica cuál es la **primera incoherencia** que observas y por qué puede impedir la comunicación directa entre ambas máquinas. **(0,4 p)**

## 1.2

Indica qué comandos utilizarías en cada sistema para comprobar:

- dirección IP;
- conectividad con el otro equipo.

**(0,3 p)**

## 1.3

Si las IP fueran correctas y el `ping` siguiera fallando, indica **tres comprobaciones**, en un orden razonable, que realizarías antes de modificar la configuración al azar. **(0,3 p)**

---

# 2. Automatización Linux con Bash — 3 puntos

Debes crear:

```text
alta_usuario.sh
```

Se utilizará así:

```bash
./alta_usuario.sh USUARIO LOG
```

Ejemplo:

```bash
./alta_usuario.sh marta /tmp/altas.log
```

## Requisitos

El script debe:

1. comprobar que recibe **exactamente dos parámetros**;
2. si el número de parámetros es incorrecto:
   - mostrar una línea de uso;
   - finalizar con código de error;
3. comprobar si el usuario indicado ya existe;
4. si existe:
   - mostrar un mensaje;
   - añadir al fichero de log una línea indicando que ya existía;
5. si no existe:
   - crear el usuario con directorio personal;
   - añadir al log una línea indicando que se ha creado;
6. no sobrescribir el contenido anterior del log;
7. devolver código `0` cuando la operación finalice correctamente.

!!! note "No se pide"
    No se pide utilizar bucles, funciones ni estructuras que no se hayan trabajado.

## Evidencias

Ejecuta y muestra:

### Caso A

Usuario que ya existe.

### Caso B

Usuario que no existe.

### Caso C

Ejecución con número de parámetros incorrecto.

**Puntuación:**

- validación de parámetros: **0,6 p**
- comprobación de usuario: **0,6 p**
- creación correcta: **0,5 p**
- escritura en log sin sobrescribir: **0,5 p**
- códigos de salida y mensajes: **0,4 p**
- claridad y funcionamiento global: **0,4 p**

---

# 3. PowerShell: objetos, pipeline e informe — 2,5 puntos

Existe la carpeta:

```text
C:\ASO\informe
```

Debes crear:

```text
estado.ps1
```

El script recibirá por parámetro la ruta de salida:

```powershell
.\estado.ps1 -RutaSalida C:\ASO\informe
```

## Parte A · Procesos

Genera:

```text
procesos.csv
```

con los **5 procesos que más memoria utilizan**, ordenados de mayor a menor.

El CSV debe contener únicamente:

```text
Name
Id
WorkingSet
```

## Parte B · Servicios

Genera:

```text
servicios_detenidos.csv
```

con los servicios cuyo estado sea:

```text
Stopped
```

Debe contener:

```text
Name
Status
```

## Parte C · Razonamiento

Un compañero propone:

```powershell
Get-Process |
    Format-Table Name, Id, WorkingSet |
    Export-Csv C:\ASO\informe\procesos.csv
```

Explica por qué **no es una buena solución** si queremos seguir trabajando con los datos y exportarlos correctamente.

**Puntuación:**

- parámetro del script: **0,3 p**
- pipeline de procesos: **0,8 p**
- CSV de procesos: **0,4 p**
- filtrado y CSV de servicios: **0,7 p**
- explicación `Format-Table` frente a datos: **0,3 p**

---

# 4. Acceso remoto y transferencia — 2 puntos

Desde Windows debes administrar Ubuntu.

## Situación

La conectividad IP funciona.

Sin embargo:

```powershell
ssh alumno@IP_UBUNTU
```

devuelve un error de conexión.

## 4.1 Diagnóstico

Indica qué comprobarías **antes de modificar claves o usuarios** y qué comando visto en clase utilizarías en Ubuntu para comprobar el servicio SSH. **(0,5 p)**

## 4.2 Claves

Responde brevemente:

1. ¿qué clave puede instalarse/copiarse en el servidor?
2. ¿qué clave debe permanecer protegida en el equipo cliente?
3. ¿en qué fichero del usuario remoto se almacenan habitualmente las claves públicas autorizadas en Linux?

**(0,5 p)**

## 4.3 SCP

Cuando SSH funcione, copia:

```text
C:\ASO\inventario.txt
```

al directorio personal del usuario remoto.

Escribe la orden utilizada y demuestra que el fichero existe en Ubuntu. **(0,6 p)**

## 4.4 Método de diagnóstico

Resume el problema utilizando:

```text
síntoma → hipótesis → prueba → resultado
```

**(0,4 p)**

---

# 5. Active Directory: diseño y privilegios — 1,5 puntos

El dominio:

```text
aso.local
```

ya está operativo.

La empresa tiene:

```text
Dirección
Sistemas
Administración
```

Se crearán usuarios y equipos para estos departamentos.

## 5.1

Propón una estructura sencilla de **OU** para organizar el dominio. Puedes expresarla mediante un esquema. **(0,5 p)**

## 5.2

Explica por qué:

```text
OU ≠ grupo
```

y pon un ejemplo de uso de cada uno. **(0,4 p)**

## 5.3

Un técnico propone añadir a todos los usuarios de Sistemas a:

```text
Domain Admins
```

«para evitar problemas de permisos».

Explica por qué esta solución es incorrecta desde el principio de **mínimo privilegio** y qué enfoque sería más razonable. **(0,4 p)**

## 5.4

Indica la diferencia entre:

```text
autenticación
autorización
```

**(0,2 p)**

---

# ✅ Entrega

Antes de finalizar comprueba:

- [ ] El script Bash funciona en los tres casos solicitados.
- [ ] Los dos CSV de PowerShell contienen datos coherentes.
- [ ] Has demostrado la transferencia SCP.
- [ ] Las respuestas de diagnóstico están justificadas.
- [ ] No has utilizado técnicas no explicadas para ocultar errores.
