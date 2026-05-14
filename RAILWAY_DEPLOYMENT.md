# Railway Deployment Guide

## Pré-requisitos

- Conta no Railway (https://railway.app)
- Git configurado e repositório da aplicação
- Variáveis de ambiente prontas

## Passos de Deploy

### 1. Criar Projeto no Railway

```bash
# Faz login no Railway
railway login

# Cria novo projeto (ou usa existing)
railway init
```

### 2. Adicionar Plugin MySQL

1. Vai ao dashboard do Railway
2. No teu projeto, clica em "+ Add Plugin"
3. Seleciona "MySQL" e configura (Railway auto-configura credenciais)

### 3. Importar Base de Dados

Após criação do MySQL no Railway:

```bash
# Constrói a BD usando os scripts locais
mysql -h <MYSQLHOST> -u <MYSQLUSER> -p<MYSQLPASSWORD> -D <MYSQLDATABASE> < bdd/ScriptTabelas.sql
mysql -h <MYSQLHOST> -u <MYSQLUSER> -p<MYSQLPASSWORD> -D <MYSQLDATABASE> < bdd/SeedData.sql
```

Ou usa o Railway CLI:
```bash
railway connect mysql
# Depois executa os SQL scripts no prompt
```

### 4. Deploy da Aplicação

```bash
# Push do código para Railway
git push railway main

# Ou usa Railway CLI
railway deploy
```

Railway **auto-detecta PHP** e configura:
- ✅ Web server (Apache com mod_rewrite)
- ✅ PHP 8.5+
- ✅ Variáveis de ambiente (MYSQL* variables)
- ✅ HTTPS automático
- ✅ Domain customizado

### 5. Verificar Deploy

1. Vai ao dashboard Railway
2. Verifica logs na aba "Deployments"
3. Abre a URL gerada (ex: `https://culturall-production.up.railway.app`)

## Variáveis de Ambiente

Railway fornece automaticamente ao plugin MySQL:

- `MYSQLHOST` - Host da BD
- `MYSQLPORT` - Porto (default 3306)
- `MYSQLDATABASE` - Nome da BD
- `MYSQLUSER` - Utilizador BD
- `MYSQLPASSWORD` - Password BD

Estas variáveis são injetadas automaticamente no runtime PHP.

## Troubleshooting

**Erro de conexão à BD:**
- Verifica se MySQL foi adicionado ao projeto
- Verifica logs de deployment
- Confirma que scripts SQL foram executados

**Aplicação não aparece:**
- Aguarda 2-3 minutos após deploy
- Verifica logs na aba "Deployments"
- Confirma que não há erros de sintaxe PHP

**CORS/Headers errors:**
- A aplicação tem headers CORS configurados em `api/bootstrap.php`
- Frontend faz requests relativas (`api/...`)

## Configuração Customizada

Se precisares de variáveis de ambiente adicionais:

1. No dashboard Railway, vai ao serviço da app
2. Clica em "Variables"
3. Adiciona `DB_HOST`, `DB_NAME`, etc. se necessário
4. Redeploy automático após mudança

A aplicação tenta:
1. `MYSQLHOST` (Railway)
2. `DB_HOST` (Customizado)
3. Fallback `127.0.0.1`

## Rollback

```bash
railway rollback --version <previous-version>
```

## Contacto e Suporte

Para dúvidas sobre Railway: https://docs.railway.app
