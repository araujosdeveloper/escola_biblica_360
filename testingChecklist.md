
@'
# Checklist de Testes Manuais — Escola Bíblica 360

Use este arquivo para testar o site durante o desenvolvimento e antes de publicar alterações.

Este checklist é focado em testes manuais: abrir páginas, clicar em botões, preencher formulários e conferir se tudo funciona como esperado.

## 1. Preparação

Antes de testar, confirme que o projeto está rodando.

Comando para iniciar o projeto:

npm run dev

Endereços esperados:

Frontend:
http://localhost:3000/

PocketBase Admin:
http://localhost:8090/_/

PocketBase API:
http://localhost:8090/api/

Confirme:

- [ ] O terminal não mostra erro em vermelho.
- [ ] O frontend iniciou corretamente.
- [ ] O PocketBase iniciou corretamente.
- [ ] O navegador abre o site local.
- [ ] O navegador abre o painel do PocketBase.

## 2. Página inicial

- [ ] A página inicial abre sem erro.
- [ ] O carregamento inicial é rápido.
- [ ] O menu principal aparece.
- [ ] O logo ou nome do site aparece corretamente.
- [ ] Os principais blocos de conteúdo aparecem.
- [ ] Os botões principais aparecem corretamente.
- [ ] Os links principais funcionam.
- [ ] Não há erro visível na tela.
- [ ] Não há erro inesperado no console do navegador.

## 3. Navegação

- [ ] O menu principal funciona.
- [ ] Links internos abrem a página correta.
- [ ] Links externos abrem corretamente.
- [ ] Botões principais levam para o destino correto.
- [ ] O usuário consegue voltar para a página inicial.
- [ ] Atualizar a página não quebra a rota atual.
- [ ] Página inexistente mostra mensagem adequada ou página 404.

## 4. Busca

- [ ] O campo de busca aparece.
- [ ] A busca aceita texto.
- [ ] A busca retorna resultados quando há conteúdo compatível.
- [ ] A busca mostra mensagem adequada quando não há resultados.
- [ ] A busca não quebra com acentos.
- [ ] A busca não quebra com letras maiúsculas e minúsculas.
- [ ] A busca não quebra com campo vazio.
- [ ] Clicar em um resultado abre o conteúdo correto.

Exemplos para testar:

- fé
- Jesus
- oração
- escatologia

## 5. Categorias

- [ ] A lista de categorias aparece.
- [ ] Cada categoria abre corretamente.
- [ ] A categoria mostra os conteúdos relacionados.
- [ ] Categoria vazia mostra mensagem adequada.
- [ ] O botão ou link de voltar funciona, se existir.
- [ ] A URL da categoria é legível.
- [ ] A página não quebra se a categoria não existir.

## 6. Posts, estudos ou artigos

- [ ] A lista de posts, estudos ou artigos aparece.
- [ ] Cada item possui título.
- [ ] Cada item possui resumo ou descrição, se aplicável.
- [ ] Cada item possui categoria, se aplicável.
- [ ] Cada item possui data, se aplicável.
- [ ] Clicar em um item abre a página de detalhes.
- [ ] A página de detalhes carrega o conteúdo completo.
- [ ] O título aparece corretamente.
- [ ] A data aparece corretamente, se aplicável.
- [ ] A categoria aparece corretamente, se aplicável.
- [ ] Imagens aparecem corretamente, se aplicável.
- [ ] Conteúdo longo é exibido sem quebrar o layout.
- [ ] O usuário consegue voltar ou navegar para outro conteúdo.

## 7. Downloads

- [ ] A página de downloads abre.
- [ ] A lista de materiais aparece.
- [ ] Cada material possui título.
- [ ] Cada material possui descrição, se aplicável.
- [ ] Cada material possui botão ou link de download.
- [ ] O download abre ou baixa o arquivo correto.
- [ ] Arquivo inexistente exibe erro adequado.
- [ ] A página não expõe arquivos privados indevidamente.

## 8. Formulário de contato

- [ ] A página ou seção de contato abre.
- [ ] Campos obrigatórios estão identificados.
- [ ] O formulário impede envio vazio.
- [ ] O campo de email valida formato inválido.
- [ ] Mensagem de sucesso aparece após envio válido.
- [ ] Mensagem de erro aparece se o envio falhar.
- [ ] O envio cria registro no PocketBase, se aplicável.
- [ ] Dados sensíveis não aparecem no console do navegador.

Dados de teste:

Nome: Teste Local
Email: teste@example.com
Mensagem: Esta é uma mensagem de teste.

## 9. Newsletter

- [ ] O campo de newsletter aparece.
- [ ] O formulário impede envio vazio.
- [ ] O campo de email valida formato inválido.
- [ ] Cadastro válido mostra mensagem de sucesso.
- [ ] Email duplicado mostra mensagem adequada, se aplicável.
- [ ] O cadastro cria registro no PocketBase, se aplicável.
- [ ] Dados sensíveis não aparecem no console do navegador.

Email de teste:

newsletter-teste@example.com

## 10. Área administrativa

- [ ] A rota administrativa existe.
- [ ] Usuário não autenticado não acessa páginas protegidas.
- [ ] Login admin funciona com credenciais válidas.
- [ ] Login admin falha com credenciais inválidas.
- [ ] Logout funciona.
- [ ] O painel carrega sem erro.
- [ ] O menu administrativo funciona.
- [ ] Páginas protegidas não aparecem para usuários sem permissão.

## 11. Admin — conteúdo

Se o painel permitir gerenciar conteúdos:

- [ ] Criar novo post, estudo ou artigo funciona.
- [ ] Editar post, estudo ou artigo funciona.
- [ ] Remover post, estudo ou artigo exige cuidado ou confirmação.
- [ ] Criar categoria funciona.
- [ ] Editar categoria funciona.
- [ ] Remover categoria exige cuidado ou confirmação.
- [ ] Upload de imagem funciona.
- [ ] Upload de arquivo funciona.
- [ ] Conteúdo criado no admin aparece no site público.
- [ ] Conteúdo editado no admin atualiza no site público.
- [ ] Conteúdo removido do admin desaparece do site público.

## 12. PocketBase

- [ ] O painel do PocketBase abre em http://localhost:8090/_/.
- [ ] O login de superuser funciona.
- [ ] As coleções esperadas aparecem.
- [ ] As regras públicas e privadas foram revisadas.
- [ ] As coleções públicas expõem somente o necessário.
- [ ] As coleções administrativas não estão públicas indevidamente.
- [ ] Uploads funcionam.
- [ ] URLs de arquivos funcionam.
- [ ] A API responde em http://localhost:8090/api/.

Coleções esperadas, se aplicável:

- [ ] posts
- [ ] categories
- [ ] downloads
- [ ] newsletter_subscribers
- [ ] contact_messages

## 13. Responsividade

Teste em pelo menos três larguras:

Celular: 360px a 430px
Tablet: 768px a 1024px
Desktop: 1366px ou maior

- [ ] Layout funciona em celular.
- [ ] Menu funciona em celular.
- [ ] Textos não ficam cortados.
- [ ] Botões são fáceis de tocar.
- [ ] Imagens não estouram a tela.
- [ ] Formulários são fáceis de usar.
- [ ] Layout funciona em tablet.
- [ ] Layout funciona em desktop.

## 14. Acessibilidade

- [ ] É possível navegar usando teclado.
- [ ] O foco visível aparece em botões e links.
- [ ] Campos de formulário possuem nome ou label.
- [ ] Imagens importantes possuem texto alternativo.
- [ ] Textos têm contraste suficiente.
- [ ] Botões possuem texto claro.
- [ ] Links fazem sentido fora de contexto.
- [ ] Mensagens de erro são compreensíveis.
- [ ] Informações importantes não dependem apenas de cor.

## 15. SEO básico

- [ ] Página inicial possui título adequado.
- [ ] Páginas importantes possuem meta description.
- [ ] Existe apenas um h1 principal por página.
- [ ] Títulos seguem uma ordem lógica.
- [ ] URLs são legíveis.
- [ ] Imagens importantes possuem alt.
- [ ] Compartilhamento em redes sociais mostra título e imagem adequados, se aplicável.
- [ ] Favicon aparece corretamente.
- [ ] Sitemap foi revisado, se aplicável.
- [ ] Robots.txt foi revisado, se aplicável.

## 16. Performance básica

- [ ] Página inicial não demora excessivamente para carregar.
- [ ] Imagens não são grandes demais sem necessidade.
- [ ] Não há requisições repetidas desnecessárias.
- [ ] Listas grandes não travam a página.
- [ ] O console não mostra erros recorrentes.
- [ ] O site continua usável em conexão mais lenta.
- [ ] O build de produção é gerado sem erro.

## 17. Segurança básica

- [ ] Rotas admin estão protegidas.
- [ ] Dados administrativos não aparecem para usuários públicos.
- [ ] Coleções privadas não estão abertas publicamente.
- [ ] Mensagens de erro não revelam informações sensíveis.
- [ ] Nenhuma senha aparece no código.
- [ ] Nenhum token aparece no código.
- [ ] Nenhum dado sensível aparece no console.
- [ ] Nenhum arquivo .env local será enviado ao GitHub.

## 18. Teste em navegadores

Teste pelo menos:

- [ ] Google Chrome.
- [ ] Microsoft Edge.
- [ ] Navegador em celular Android, se possível.
- [ ] Safari ou iPhone, se possível.

## 19. Teste final antes de commit

Antes de salvar alterações no Git, rode:

npm run lint
npm run build
git status

Confirme:

- [ ] npm run lint passou.
- [ ] npm run build passou.
- [ ] O git status mostra apenas arquivos relacionados à mudança.
- [ ] Nenhum arquivo sensível será enviado ao GitHub.
- [ ] Nenhum arquivo desnecessário será enviado ao GitHub.
- [ ] A mensagem de commit descreve bem a mudança.

## 20. Resultado do teste

Data:

____/____/________

Responsável:

______________________________

Ambiente testado:

Local / Produção / Homologação

Navegador usado:

Chrome / Edge / Safari / Firefox / Outro

Observações:

__________________________________________________________________
__________________________________________________________________
__________________________________________________________________
