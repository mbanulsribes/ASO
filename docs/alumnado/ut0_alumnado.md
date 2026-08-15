---
title: "UT0 · Laboratorio virtual con Proxmox"
description: "Virtualización, redes virtuales, diagnóstico y snapshots"
---

## 🧪 UT0 · Laboratorio virtual con Proxmox

!!! info "Cómo trabajaremos"
    Esta UT ocupa **4 sesiones de 2 horas**.

    - **Lunes:** trabajo autónomo guiado.
    - **Martes:** práctica inicial, preguntas, teoría y consolidación.

    El objetivo no es aprender todas las opciones de Proxmox, sino disponer de un entorno fiable sobre el que trabajar durante el resto del curso.

## 1. Resultados de aprendizaje de la unidad

Al terminar deberás poder:

- distinguir host, hipervisor, guest y VM;
- justificar para qué usamos virtualización en administración de sistemas;
- crear y dimensionar una VM de forma razonable;
- instalar Ubuntu Server y Windows Server;
- identificar interfaces y direcciones IP;
- comprender la función de un bridge;
- comprobar conectividad;
- realizar diagnóstico básico de red;
- crear y utilizar snapshots de laboratorio.

---

## 📖 2. Virtualización

La **virtualización** permite ejecutar varios sistemas operativos aislados utilizando los mismos recursos físicos.

```text
SERVIDOR FÍSICO
├── CPU
├── RAM
├── almacenamiento
└── red
     │
     ▼
  Proxmox VE
     ├── VM Ubuntu Server
     └── VM Windows Server
```

###### 2.1 Host, hipervisor y guest

| Concepto | Significado |
|---|---|
| Host | Equipo físico que aporta los recursos |
| Hipervisor | Capa que crea y administra VMs |
| Guest | Sistema operativo instalado dentro de una VM |
| VM | Máquina virtual con hardware lógico propio |

!!! question "Comprueba que lo entiendes"
    Si una VM tiene asignados 2 GB de RAM y el host dispone de 32 GB, ¿puede esa VM utilizar automáticamente los 32 GB?

    No. La VM ve los recursos que tiene asignados.

###### 2.2 Hipervisores de tipo 1

En un hipervisor de tipo 1, la plataforma de virtualización se ejecuta directamente sobre el hardware del servidor.

Esto lo diferencia de soluciones de escritorio en las que primero se arranca Windows o Linux y después un programa de virtualización.

!!! note "Nivel CFGS"
    No necesitas memorizar clasificaciones históricas de hipervisores, pero sí comprender la diferencia entre **virtualización de servidor** y ejecutar una VM dentro de un sistema de escritorio.

---

## 3. Recursos virtuales

###### 3.1 CPU

Asignar más vCPU no garantiza automáticamente mejor rendimiento.

El host comparte su capacidad entre varias máquinas.

###### 3.2 RAM

Ejemplo de laboratorio:

```text
Host disponible: 16 GB

Ubuntu Server: 2 GB
Windows Server: 4 GB
Resto: Proxmox + otros procesos/VMs
```

!!! warning "Sobreasignación"
    Un laboratorio con muchas VMs sobredimensionadas puede funcionar peor que uno con asignaciones moderadas.

###### 3.3 Disco

La VM ve un disco lógico que puede particionar y formatear.

Para la VM:

```text
/dev/sda
```

o:

```text
C:
```

es su disco, aunque físicamente el almacenamiento esté gestionado por Proxmox.

---

## 4. ISO e instalación

Una ISO es una imagen de instalación.

```text
ISO → arranque → instalación → disco virtual
```

Una vez instalado el sistema, la ISO deja de ser necesaria para el arranque normal.

---

## 5. Red virtual

Cada VM puede disponer de una o varias interfaces virtuales.

En Proxmox es habitual conectarlas a un **bridge**.

```text
                 vmbr0
          ┌────────────────┐
          │ bridge virtual │
          └───────┬────────┘
                  │
       ┌──────────┴──────────┐
       │                     │
 Ubuntu Server         Windows Server
```

Podemos interpretar el bridge como un switch lógico.

!!! note "Importante"
    El nombre `vmbr0` es habitual, pero el laboratorio puede utilizar otro bridge. Lo importante es comprender su función.

---

## 6. Dirección IP y conectividad

###### Linux

```bash
ip a
```

###### Windows

```powershell
ipconfig
```

Ejemplo:

```text
Ubuntu   192.168.10.21/24
Windows  192.168.10.22/24
```

Ambos equipos parecen pertenecer a la misma red `/24`.

###### `ping`

```bash
ping 192.168.10.22
```

permite comprobar conectividad IP básica mediante ICMP.

!!! warning "`ping` no es una prueba absoluta"
    Un firewall puede bloquear ICMP. Que no haya respuesta no significa automáticamente que no exista conectividad para otros servicios.

---

## 7. Diagnóstico básico de red

No cambies configuraciones al azar.

Sigue una secuencia:

```text
1. ¿La VM está arrancada?
2. ¿Existe la interfaz virtual?
3. ¿Está conectada al bridge correcto?
4. ¿Tiene IP?
5. ¿IP/máscara son coherentes?
6. ¿Hay conectividad con el otro extremo?
7. ¿Puede intervenir un firewall?
```

!!! tip "Método profesional"
    Modifica **una variable cada vez**, comprueba y documenta el resultado.

---

## 8. Snapshots

Un snapshot permite guardar un estado de una VM.

Ejemplos:

```text
00-ubuntu-limpio
00-windows-limpio
01-antes-ssh
02-antes-ad
```

!!! danger "Snapshot ≠ backup"
    En el laboratorio lo utilizaremos como punto de recuperación. No sustituye una estrategia real de copias de seguridad.

---

## 🟦 Lunes 14/09 · Sesión 1 — Ubuntu Server

###### Situación

Necesitas un servidor Linux para realizar prácticas sin modificar el equipo físico.

###### Trabajo autónomo

1. Accede a Proxmox.
2. Localiza nodo, almacenamiento y VMs.
3. Crea una VM Ubuntu Server.
4. Instala el sistema.
5. Inicia sesión.
6. Ejecuta:

```bash
hostname
ip a
```

###### Evidencia

Entrega:

- nombre de la VM;
- captura de `hostname`;
- captura de `ip a`;
- breve explicación de qué diferencia hay entre host y guest.

---

## 🟧 Martes 15/09 · Sesión 2 — Virtualización y recursos

###### Práctica inicial

Sin consultar teoría:

1. localiza cuánta RAM tiene tu VM;
2. localiza cuántas vCPU;
3. localiza la interfaz virtual;
4. localiza el disco virtual.

###### Preguntas

- ¿qué recursos son físicos y cuáles virtuales?
- ¿qué ocurriría si duplicaras la RAM asignada?
- ¿podrías instalar otro sistema operativo sobre la misma VM?

###### Teoría

Se formalizan:

- host;
- hipervisor;
- guest;
- vCPU;
- RAM virtual;
- disco virtual;
- ISO.

###### Consolidación

Explica en 5 líneas por qué una VM es útil para un administrador de sistemas.

---

## 🟦 Lunes 21/09 · Sesión 3 — Windows Server

###### Trabajo autónomo

Crea una VM Windows Server.

Después ejecuta:

```powershell
hostname
ipconfig
```

###### Compara

| Linux | Windows |
|---|---|
| `hostname` | `hostname` |
| `ip a` | `ipconfig` |
| Bash | PowerShell |
| interfaz Linux | adaptador Windows |

###### Evidencia

Anota:

```text
IP Ubuntu:
IP Windows:
Bridge Ubuntu:
Bridge Windows:
```

---

## 🟧 Martes 22/09 · Sesión 4 — Red, diagnóstico y snapshots

###### Práctica inicial

Desde Ubuntu:

```bash
ping IP_WINDOWS
```

Desde Windows:

```powershell
ping IP_UBUNTU
```

###### Preguntas

- ¿qué demuestra un ping correcto?
- ¿qué no demuestra?
- ¿qué revisarías si falla?

###### Teoría

- bridge;
- interfaz virtual;
- IP;
- subred;
- ICMP;
- diagnóstico básico.

###### Consolidación

Crea snapshots:

```text
00-ubuntu-limpio
00-windows-limpio
```

---

## 🎯 Reto profesional UT0

###### Escenario

Te incorporas al equipo de sistemas de una pequeña empresa. Te piden crear un laboratorio virtual con dos servidores para realizar pruebas sin afectar a los sistemas reales.

###### Requisitos

Debes desplegar:

- un Ubuntu Server;
- un Windows Server;
- recursos razonables;
- conectividad entre ambos;
- snapshots iniciales.

Además, debes entregar una **ficha técnica** con:

```text
VM
SO
vCPU
RAM
IP
Bridge
Estado del ping
Snapshot
```

###### Incidencia incluida

La profesora modificará o indicará una configuración incorrecta en una de las VMs.

Debes:

1. identificar el problema;
2. justificar cómo lo has localizado;
3. corregirlo;
4. comprobar el resultado.

!!! abstract "Nivel esperado"
    El reto no se supera únicamente con capturas. Debes demostrar que entiendes la configuración y puedes diagnosticar una incidencia básica.

---

## 📝 Tipo examen

Podrías recibir una VM que:

- no tiene IP;
- está conectada al bridge incorrecto;
- no responde a otra VM.

Se te pedirá identificar la causa y documentar la solución.

---

## ✅ Resumen de estudio

Debes dominar:

```text
host
hipervisor
guest
VM
ISO
vCPU
RAM virtual
bridge
IP
ping
snapshot
```

Y saber utilizar:

```bash
ip a
ping IP
```

```powershell
ipconfig
ping IP
```
