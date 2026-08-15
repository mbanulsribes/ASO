---
title: "UT0 · Guía profesora"
description: "4 sesiones de 2 h · Proxmox y diagnóstico"
---

# 🧑‍🏫 UT0 · Guía profesora


!!! info "Marco fijo"
    - **4 horas semanales**: 2 h lunes + 2 h martes.
    - Lunes: autónomo, guiado por el tema.
    - Martes: práctica → preguntas → teoría → consolidación.
    - Nivel: **2.º ASIR / CFGS**.
    - El reto debe exigir interpretación, no solo reproducir pasos.


## Sesiones

| Fecha | Sesión | Objetivo |
|---|---|---|
| Lun 14/09 | Autónoma | Ubuntu + reconocimiento de Proxmox |
| Mar 15/09 | Contigo | Virtualización y recursos |
| Lun 21/09 | Autónoma | Windows + comparación |
| Mar 22/09 | Contigo | Red + diagnóstico + snapshots |

## Nivel mínimo exigible

No basta con que creen VMs. Deben saber **diagnosticar una incidencia básica**.

## Tu chuleta

```text
VM → Hardware → CPU/RAM/Network
ip a
ipconfig
ping
bridge
snapshot
```

## Reto

Incluye una incidencia controlada:

```text
bridge incorrecto
IP incorrecta
interfaz desconectada
```

Evalúa:

- método de diagnóstico;
- explicación;
- corrección;
- comprobación final.

## Qué NO profundizar

- clústeres;
- Ceph;
- HA;
- SDN;
- almacenamiento distribuido.
