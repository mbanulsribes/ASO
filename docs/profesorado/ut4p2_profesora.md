---
title: "UT4 P2 · Guía profesora"
description: "GPO y administración centralizada · 8 horas"
---

# 🧑‍🏫 UT4 P2 · GPO


!!! info "Marco metodológico fijo"
    - Nivel: **2.º ASIR / CFGS**.
    - Carga: **4 h semanales**: 2 h lunes + 2 h martes.
    - **Lunes:** sesión autónoma, autocontenida y con preparación docente mínima.
    - **Martes:** práctica → preguntas → teoría → consolidación.
    - El reto final debe medir **autonomía, diagnóstico y justificación**, no reproducción mecánica de una receta.


## Tu objetivo

Que comprendan:

```text
GPO + ámbito + procesamiento + comprobación
```

No que memoricen rutas interminables de menús.

## Sesión 1 · Lun 11/01

**Preparación tuya: 0–10 min.**

Ellos:

- revisan dominio;
- crean OU;
- crean GPO vacía;
- localizan User/Computer Configuration.

Tú:

- desbloqueas;
- observas confusión OU/grupo.

## Sesión 2 · Mar 12/01

Orden:

```text
0–25  configurar restricción
25–45 probar
45–65 preguntas
65–90 teoría GPO
90–110 gpupdate/gpresult
110–120 cierre
```

### Tu chuleta

```powershell
gpupdate /force
gpresult /r
```

## Sesión 3 · Lun 18/01

Autónoma: Drive Maps.

La documentación de Microsoft incluye **Drive Maps** como Group Policy Preference. No necesitas aprender scripts de inicio para resolver este objetivo.

## Sesión 4 · Mar 19/01

Reto por OU + diagnóstico.

### Errores que puedes preparar

- usuario en OU equivocada;
- GPO sin vínculo;
- configuración en Computer cuando debía ser User;
- ruta SMB inexistente;
- usuario sin permiso sobre el share.

!!! tip "Para ti"
    Si no se aplica, no empieces creando otra GPO. Comprueba primero `gpresult`.

## Examen

Mantén el objetivo original: mapear un recurso de red mediante GPO, pero exige también comprobar que **solo afecta al ámbito solicitado**. El simulacro inicial ya proponía el mapeo de una unidad de red. fileciteturn1file1L104-L112
