---
title: "UT1 · Automatización con Bash"
description: "Shell, scripts, parámetros, validación, condiciones y copias de seguridad"
---

## 🐧 UT1 · Automatización con Bash

!!! info "Carga"
    Esta UT ocupa **5 sesiones de 2 horas**.

    El objetivo es que puedas construir scripts pequeños de administración, no solo copiar comandos.

## 1. Objetivos

Al terminar podrás:

- explicar qué es un shell;
- crear scripts ejecutables;
- utilizar variables y parámetros;
- validar argumentos;
- tomar decisiones con `if`;
- utilizar operadores sobre ficheros;
- interpretar estados de salida;
- aplicar redirecciones básicas;
- combinar comandos de administración;
- construir un script de backup razonable.

---

## 📖 2. Shell y Bash

Un **shell** interpreta órdenes y permite interactuar con el sistema.

Bash es uno de los shells más utilizados en GNU/Linux.

```bash
mkdir documentos
```

El shell interpreta la orden y solicita al sistema la operación.

!!! note "Terminal ≠ shell"
    La terminal es la interfaz. Bash es el intérprete.

---

## 3. Scripts

Un script es un archivo que automatiza una secuencia.

```bash
##!/bin/bash

echo "Inicio"
mkdir -p copias
cp fichero.txt copias/
echo "Fin"
```

###### 3.1 Shebang

```bash
##!/bin/bash
```

indica el intérprete.

###### 3.2 Permisos

```bash
chmod +x script.sh
./script.sh
```

---

## 4. Variables

```bash
nombre="Ana"
echo "$nombre"
```

!!! danger "No pongas espacios"
    ```bash
    nombre = "Ana"
    ```

    es incorrecto.

###### 4.1 Comillas

```bash
ruta="/home/ana/Mis documentos"
cp "$ruta/fichero.txt" /tmp/
```

Las comillas evitan problemas con espacios y caracteres especiales.

---

## 5. Sustitución de comandos

```bash
fecha=$(date +%Y-%m-%d)
```

Permite utilizar el resultado de un comando como dato.

Ejemplo:

```bash
backup_$fecha.tar.gz
```

---

## 6. Parámetros

Script:

```bash
##!/bin/bash
echo "Hola $1"
```

Ejecución:

```bash
./saluda.sh Marta
```

| Variable | Uso |
|---|---|
| `$0` | nombre del script |
| `$1` | primer parámetro |
| `$2` | segundo |
| `$##` | número de parámetros |

###### 6.1 Validar parámetros

Un script profesional no debería asumir que siempre se usa bien.

```bash
if [ "$##" -ne 2 ]; then
    echo "Uso: $0 ORIGEN DESTINO"
    exit 1
fi
```

!!! info "Nivel CFGS"
    La validación de parámetros diferencia un script robusto de una secuencia que solo funciona en el caso ideal.

---

## 7. Condiciones

```bash
if [ condicion ]; then
    ...
else
    ...
fi
```

###### 7.1 Ficheros y directorios

| Operador | Comprueba |
|---|---|
| `-d` | directorio |
| `-f` | fichero regular |
| `-e` | existe |
| `-r` | legible |
| `-w` | escribible |
| `-x` | ejecutable |

Ejemplo:

```bash
if [ -d "$1" ]; then
    echo "Directorio válido"
else
    echo "No existe"
fi
```

---

## 8. Estados de salida

En sistemas Unix, un comando devuelve un código.

```text
0 → éxito
otro valor → error/condición no satisfecha
```

Por eso podemos escribir:

```bash
if id "$1" &>/dev/null; then
    echo "Existe"
else
    echo "No existe"
fi
```

###### 8.1 `exit`

Podemos finalizar un script:

```bash
exit 0
```

o indicar error:

```bash
exit 1
```

---

## 9. Redirecciones básicas

```bash
comando > salida.txt
```

sobrescribe la salida.

```bash
comando >> salida.txt
```

añade al final.

```bash
comando 2> errores.txt
```

redirige errores.

```bash
comando &>/dev/null
```

descarta salida normal y error.

!!! note "No necesitas dominar toda la sintaxis de redirecciones"
    Sí debes entender para qué se usan y reconocer las más habituales.

---

## 10. Comandos útiles para automatización

```bash
mkdir
cp
mv
rm
tar
date
id
useradd
```

###### 10.1 Backup comprimido

```bash
fecha=$(date +%Y%m%d_%H%M)
tar -czf "backup_$fecha.tar.gz" /ruta/origen
```

---

## 11. Pensar antes de programar

Problema:

> Crear una copia comprimida de un directorio solo si existe.

Algoritmo:

```text
recibir origen
comprobar que existe
generar fecha
crear backup
mostrar resultado
```

Código:

```bash
##!/bin/bash

origen="$1"

if [ ! -d "$origen" ]; then
    echo "ERROR: no existe $origen"
    exit 1
fi

fecha=$(date +%Y%m%d_%H%M)

tar -czf "backup_$fecha.tar.gz" "$origen"

if [ "$?" -eq 0 ]; then
    echo "Backup correcto"
else
    echo "Error en el backup"
    exit 2
fi
```

!!! tip "Como administrador"
    Antes de escribir código, escribe el procedimiento.

---

## 🟦 Lunes 28/09 · Primer script

Práctica guiada:

```bash
##!/bin/bash
echo "Usuario: $(whoami)"
echo "Equipo: $(hostname)"
echo "Fecha: $(date)"
```

Después añade una acción real.

######## Evidencia

Explica:

- qué hace el shebang;
- por qué `chmod +x`;
- qué diferencia hay entre editar y ejecutar.

---

## 🟧 Martes 29/09 · Variables y parámetros

Práctica inicial:

```bash
./saluda.sh Ana
./saluda.sh Luis
```

Pregunta:

> ¿Cómo consigue el mismo archivo comportarse de forma distinta?

Teoría:

- variables;
- parámetros;
- `$##`;
- validación.

Consolidación:

```bash
./crear_directorio.sh proyecto
```

Debe validar que se ha recibido exactamente un parámetro.

---

## 🟦 Lunes 05/10 · Condiciones

Experimenta con:

```bash
-d
-f
-e
```

Construye un script que reciba una ruta y diga si es:

- directorio;
- fichero;
- inexistente.

---

## 🟧 Martes 06/10 · Administración y backups

Práctica inicial:

```bash
mkdir
cp
tar
date
```

Teoría:

- combinar herramientas;
- redirecciones;
- códigos de salida;
- `exit`.

Consolidación:

script de backup con origen/destino.

---

## 🟧 Martes 13/10 · Reto profesional

!!! note "El lunes 12/10 no hay clase."

## 🎯 Reto UT1 · `backup.sh`

###### Escenario

Eres responsable de realizar copias manuales de distintos directorios de un servidor. Quieres sustituir el procedimiento por un script reutilizable.

###### Requisitos

El script se ejecutará así:

```bash
./backup.sh ORIGEN DESTINO
```

Debe:

1. comprobar que recibe exactamente dos parámetros;
2. comprobar que el origen existe y es un directorio;
3. crear el destino si no existe;
4. generar un `.tar.gz`;
5. incluir fecha y hora en el nombre;
6. mostrar mensajes claros;
7. finalizar con un código de error si no puede completar la operación;
8. no sobrescribir silenciosamente una copia previa con el mismo nombre.

###### Evidencia

Entrega:

- script;
- ejemplo correcto;
- ejemplo con origen inexistente;
- explicación de las validaciones.

---

## 📝 Tipo examen

Podrías recibir un enunciado como:

> Crea un script que reciba un nombre de usuario. Si existe, informa. Si no existe, créalo. El script debe controlar que se ha recibido exactamente un parámetro.

Solución orientativa:

```bash
##!/bin/bash

if [ "$##" -ne 1 ]; then
    echo "Uso: $0 USUARIO"
    exit 1
fi

if id "$1" &>/dev/null; then
    echo "Ya existe"
else
    sudo useradd -m "$1"
fi
```

---

## ✅ Resumen

Debes dominar:

```text
##!/bin/bash
chmod +x
variables
$1 $2 $##
if
-d -f -e
exit
estado de salida
> >> 2>
mkdir cp tar date
```
