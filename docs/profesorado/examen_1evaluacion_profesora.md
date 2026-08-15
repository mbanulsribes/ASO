---
title: "Solucionario · Examen 1.ª Evaluación"
description: "Criterios de corrección · 2.º ASIR"
---

# 🧑‍🏫 Solucionario · 1.ª Evaluación

## Criterio general

El examen mide:

```text
comprender
→ aplicar
→ comprobar
→ diagnosticar
→ justificar
```

No debe penalizarse una sintaxis ligeramente distinta si la solución es técnicamente correcta y utiliza contenidos trabajados.

---

# 1. Diagnóstico — 1 punto

## 1.1 — 0,4

Esperado:

```text
192.168.50.20/24
192.168.60.30/24
```

pertenecen a redes `/24` diferentes.

El alumno debe identificar la incoherencia de direccionamiento como primera causa probable de que no exista comunicación directa.

No hace falta que calcule subnetting avanzado.

## 1.2 — 0,3

Linux:

```bash
ip a
ping IP_WINDOWS
```

Windows:

```powershell
ipconfig
ping IP_UBUNTU
```

## 1.3 — 0,3

Tres comprobaciones coherentes, por ejemplo:

```text
interfaz virtual
bridge
IP/máscara
VM arrancada
firewall
```

Debe apreciarse un método, no una lista aleatoria.

---

# 2. Bash — 3 puntos

## Solución posible

```bash
#!/bin/bash

if [ "$#" -ne 2 ]; then
    echo "Uso: $0 USUARIO LOG"
    exit 1
fi

usuario="$1"
log="$2"

if id "$usuario" &>/dev/null; then
    echo "El usuario $usuario ya existe"
    echo "$usuario: ya existía" >> "$log"
    exit 0
else
    sudo useradd -m "$usuario"

    if [ "$?" -eq 0 ]; then
        echo "Usuario $usuario creado"
        echo "$usuario: creado" >> "$log"
        exit 0
    else
        echo "ERROR: no se pudo crear $usuario"
        exit 2
    fi
fi
```

### Corrección

**0,6 Validación**
- usa `$#`;
- exige 2 parámetros;
- muestra uso;
- `exit` no cero.

**0,6 Comprobación**
- `id "$1"` o equivalente trabajado;
- interpreta correctamente éxito/error.

**0,5 Creación**
- `useradd -m`;
- utiliza el parámetro.

**0,5 Log**
- utiliza `>>`;
- no sobrescribe;
- registra ambos casos.

**0,4 estados/mensajes**
- éxito con 0;
- error con valor distinto de 0.

**0,4 global**
- comillas razonables;
- script ejecutable y coherente.

### No exigir

- funciones;
- `case`;
- bucles;
- `logger`;
- `getopts`;
- regex avanzadas.

No están en el tema.

---

# 3. PowerShell — 2,5 puntos

## Solución posible

```powershell
param(
    [string]$RutaSalida
)

Get-Process |
    Sort-Object WorkingSet -Descending |
    Select-Object -First 5 |
    Select-Object Name, Id, WorkingSet |
    Export-Csv "$RutaSalida\procesos.csv" -NoTypeInformation

Get-Service |
    Where-Object {$_.Status -eq "Stopped"} |
    Select-Object Name, Status |
    Export-Csv "$RutaSalida\servicios_detenidos.csv" -NoTypeInformation
```

También es correcta una solución que guarde resultados en variables.

### Format-Table

Respuesta esperada:

`Format-Table` está orientado a presentación. Si después queremos seguir procesando/exportando los datos, debemos mantener objetos/datos y utilizar `Select-Object`.

No exigir explicación interna de objetos de formato.

---

# 4. SSH/SCP — 2 puntos

## 4.1

Primero servicio:

```bash
systemctl status ssh
```

También puede revisar conectividad, pero el enunciado dice que IP funciona.

## 4.2

```text
pública → se instala/autoriza
privada → permanece protegida
~/.ssh/authorized_keys → públicas autorizadas
```

## 4.3

Ejemplo:

```powershell
scp C:\ASO\inventario.txt alumno@IP_UBUNTU:/home/alumno/
```

Comprobación en Ubuntu:

```bash
ls -l
```

No exigir `cat` si demuestra existencia.

## 4.4

Debe existir razonamiento. Ejemplo:

```text
síntoma: conexión rechazada
hipótesis: servicio SSH detenido
prueba: systemctl status ssh
resultado: inactive
```

---

# 5. AD — 1,5 puntos

## 5.1

Varias soluciones válidas:

```text
aso.local
├── OU=Usuarios
│   ├── OU=Direccion
│   ├── OU=Sistemas
│   └── OU=Administracion
└── OU=Equipos
```

También:

```text
OU=Direccion
OU=Sistemas
OU=Administracion
```

con sub-OU coherentes.

Se evalúa coherencia, no una estructura única.

## 5.2

Esperado:

- OU: organización/ámbito administrativo y posterior aplicación de políticas.
- grupo: agrupa identidades para permisos/autorización u otros usos.

## 5.3

`Domain Admins` proporciona privilegios excesivos.

Respuesta razonable:

- cuentas ordinarias sin privilegio global;
- grupos específicos;
- privilegios solo donde se necesiten;
- cuenta administrativa separada si procede.

## 5.4

```text
autenticación → quién eres
autorización → qué puedes hacer
```

---

# Umbrales orientativos

!!! warning "No aplicar como automatismo"
    Una nota global alta no debería ocultar una ausencia total de competencia práctica en scripting.

Puedes considerar como evidencia especialmente relevante:

- Bash funcional.
- Pipeline PowerShell correcto.
- razonamiento de diagnóstico.

---

# Dificultad

Este examen es deliberadamente menos obvio que los retos:

- Bash cambia el problema de backup por gestión de usuarios + log.
- PowerShell combina procesos y servicios.
- SSH introduce diagnóstico previo.
- AD exige diseño y criterio de privilegios.

Pero **todas las herramientas necesarias están explicadas y practicadas** en las UT.
