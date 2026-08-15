---
title: "UT2 · Guía profesora"
description: "5 sesiones · PowerShell nivel CFGS"
---

# 🧑‍🏫 UT2 · Guía profesora


!!! info "Marco fijo"
    - **4 horas semanales**: 2 h lunes + 2 h martes.
    - Lunes: autónomo, guiado por el tema.
    - Martes: práctica → preguntas → teoría → consolidación.
    - Nivel: **2.º ASIR / CFGS**.
    - El reto debe exigir interpretación, no solo reproducir pasos.


## Sesiones

| Fecha | Enfoque |
|---|---|
| Lun 19/10 | descubrir cmdlets y ayuda |
| Mar 20/10 | objetos + pipeline |
| Lun 26/10 | filtros + ordenación |
| Mar 27/10 | scripts + parámetros + CSV |
| Lun 02/11 | reto |

## Nivel mínimo

Deben comprender:

```text
objeto
propiedad
pipeline
Where-Object
Sort-Object
Select-Object
variables
param()
Export-Csv
```

## Tu comando salvavidas

```powershell
Get-Help COMANDO -Examples
```

## Punto conceptual importante

Hazles ver:

```powershell
Get-Service | Get-Member
```

para desmontar la idea de que PowerShell solo manipula texto.

## Error a prevenir

```powershell
... | Format-Table | Export-Csv
```

Explica que formatear es para presentación, no para seguir procesando datos.

## Reto

Informe de estado del servidor.

No les obligues a iniciar todos los servicios detenidos: eso sería una mala práctica.

Evalúa:

- calidad del pipeline;
- propiedades elegidas;
- reutilización;
- parámetros;
- exportación;
- explicación.
