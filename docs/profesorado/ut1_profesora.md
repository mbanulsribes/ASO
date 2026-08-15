---
title: "UT1 · Guía profesora"
description: "5 sesiones · Bash nivel CFGS"
---

# 🧑‍🏫 UT1 · Guía profesora


!!! info "Marco fijo"
    - **4 horas semanales**: 2 h lunes + 2 h martes.
    - Lunes: autónomo, guiado por el tema.
    - Martes: práctica → preguntas → teoría → consolidación.
    - Nivel: **2.º ASIR / CFGS**.
    - El reto debe exigir interpretación, no solo reproducir pasos.


## Sesiones

| Fecha | Enfoque |
|---|---|
| Lun 28/09 | script básico |
| Mar 29/09 | variables + parámetros + validación |
| Lun 05/10 | condiciones |
| Mar 06/10 | códigos de salida + redirecciones + backup |
| Mar 13/10 | reto + examen |

## Nivel mínimo

Deben saber escribir scripts con:

```text
parámetros
validación
if
operadores de fichero
exit
estado de salida
redirecciones básicas
```

## Tu chuleta

```bash
$1 $2 $#
if [ ... ]; then
fi
-d -f -e
exit 1
$?
> >> 2>
id usuario
mkdir -p
tar -czf
```

## Martes 29/09

No enseñes primero `$1`.

Haz:

```bash
./saluda.sh Ana
./saluda.sh Luis
```

Pregunta:

> ¿Cómo recibe el dato?

Después formaliza parámetros y validación.

## Martes 06/10

Secuencia:

```text
probar comandos sueltos
↓
pensar algoritmo
↓
escribir script
↓
forzar errores
↓
mejorar validación
```

## Reto

`backup.sh ORIGEN DESTINO`

Debe detectar errores y devolver códigos razonables.

## Examen

No copies exactamente el reto. Cambia el dominio:

```text
usuarios
ficheros
directorios
servicios
```

pero conserva la estructura mental:

```text
entrada → validar → decidir → actuar → informar
```
