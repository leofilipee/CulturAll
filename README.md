# CulturAll

Aplicação web de eventos culturais com frontend em HTML/CSS/JavaScript e backend em PHP com MySQL.

## Execução local

1. Importa [bdd/ScriptTabelas.sql](bdd/ScriptTabelas.sql) na tua instância MySQL ou MariaDB.
2. Importa [bdd/SeedData.sql](bdd/SeedData.sql) para carregar utilizadores, organizadores, eventos e favoritos de teste.
3. Define as variáveis de ambiente `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` e `DB_PORT` se a tua instalação não usar os valores por defeito. Por defeito, o projeto assume `DB_USER=root` e `DB_PASSWORD=root`.
4. Arranca o servidor local a partir da raiz do projeto com `php -S 127.0.0.1:8001`.
5. Abre `http://127.0.0.1:8001/login.html` no navegador. Não uses o Live Preview do VS Code para testar login ou registo, porque ele não serve o backend PHP.

## Deployment no Railway

A aplicação está configurada para funcionar no Railway com plugin MySQL:

1. **Setup do Railway**: Cria um projeto e adiciona um serviço MySQL
2. **Variáveis de ambiente**: O Railway fornece automaticamente `MYSQLHOST`, `MYSQLPORT`, `MYSQLDATABASE`, `MYSQLUSER` e `MYSQLPASSWORD`
3. **Base de dados**: Importa os scripts [bdd/ScriptTabelas.sql](bdd/ScriptTabelas.sql) e [bdd/SeedData.sql](bdd/SeedData.sql) na BD Railway
4. **Deploy**: Faz push do código - Railway deteta a aplicação PHP automaticamente

O código em [api/bootstrap.php](api/bootstrap.php) detecta automaticamente:
- Primeiro tenta variáveis Railway (`MYSQL*`)
- Depois tenta variáveis customizadas (`DB_*`)
- Por fim usa valores locais por defeito

Ver [.env.railway](.env.railway) para variáveis de configuração.

## Observação sobre credenciais

As credenciais devem ser geridas através da base de dados importada (`bdd/SeedData.sql`). Não inclua credenciais fictícias no código-fonte.

## Registo de Organizadores

Ao criar conta, é possível escolher entre conta normal e conta de organizador. As contas normais entram logo na plataforma. As contas de organizador ficam com estado pendente até serem aprovadas no painel de administração.

## Backend PHP

Os endpoints principais estão em [api/](api): autenticação, sessão atual, eventos, favoritos e administração.

