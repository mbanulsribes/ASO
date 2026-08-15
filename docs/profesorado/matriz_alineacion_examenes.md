---
title: "Matriz de alineación · Exámenes ASO"
description: "Qué se evalúa y dónde se ha trabajado"
---

# 🎯 Matriz de alineación de exámenes

Este documento permite revisar que **todo lo evaluado está previamente explicado y practicado**.

# 1.ª Evaluación

| Examen | Contenido evaluado | Tema/práctica previa |
|---|---|---|
| 1. Diagnóstico | IP, `/24`, `ping`, bridge, firewall | UT0 teoría de red + reto con incidencia |
| 2. Bash | `$#`, `$1`, variables, `if`, `id`, `useradd -m`, `>>`, `exit`, `$?` | UT1 teoría + reto `backup.sh` + tipo examen usuario |
| 3. PowerShell | `param`, pipeline, `Sort-Object`, `Select-Object`, `Where-Object`, `Export-Csv`, datos vs formato | UT2 teoría + prácticas + reto informe |
| 4. SSH/SCP | `systemctl status ssh`, pública/privada, `authorized_keys`, `scp`, diagnóstico | UT3 teoría + reto diagnóstico |
| 5. AD | OU, grupos, mínimo privilegio, autenticación/autorización | UT4 teoría + reto de estructura empresarial |

!!! info "Variación deliberada"
    El examen cambia el **contexto**, no la técnica.

    Ejemplo: en Bash se practicó un backup robusto y un tipo examen de usuario. En el examen se combinan usuario + validación + log, todas ellas técnicas ya explicadas.

# 2.ª Evaluación

| Examen | Contenido evaluado | Tema/práctica previa |
|---|---|---|
| 1. GPO | OU, ámbito, Drive Maps, `gpupdate`, `gpresult` | UT4 P2 teoría + reto por departamentos |
| 1. Samba | permisos Linux + Samba, `systemctl`, `testparm`, `ls -ld`, `chmod 2770` | UT5 teoría + práctica de `Access denied` + reto |
| 2. Procesos/cron | rutas absolutas, logs, cron, `kill` vs `kill -9` | UT6-7 teoría + reto cron verificable |
| 3. Docker | imagen/contenedor, puertos, nombre de servicio, Compose, volumen, logs, persistencia | UT8 sesiones 1-6 + reto Compose |
| 4. Kubernetes | Deployment, réplicas, labels/selectors, Service, Pod | UT8 sesiones 7-8 + reto Kubernetes |

# Qué NO aparece en los exámenes

No se pide contenido no desarrollado como:

- bucles Bash;
- funciones Bash;
- `getopts`;
- módulos PowerShell;
- ACL Samba avanzadas;
- trusts AD;
- FSMO;
- replicación AD avanzada;
- clúster Kubernetes de producción;
- Ingress;
- ConfigMaps/Secrets de Kubernetes;
- Dockerfile avanzado.

Esto mantiene la exigencia en **razonamiento**, no en contenidos sorpresa.
