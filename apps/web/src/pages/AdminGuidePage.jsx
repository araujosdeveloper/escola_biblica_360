
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Settings, 
  FolderTree, 
  PenTool, 
  Image as ImageIcon, 
  FileDown, 
  Trash2, 
  Lightbulb,
  ExternalLink
} from 'lucide-react';

import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import TitleSection from '@/components/TitleSection.jsx';
import SectionHeader from '@/components/SectionHeader.jsx';
import StepCard from '@/components/StepCard.jsx';
import PracticalExample from '@/components/PracticalExample.jsx';
import { Button } from '@/components/ui/button';

function AdminGuidePage() {
  return (
    <>
      <Helmet>
        <title>Guia de Administração - Escola Bíblica 360</title>
        <meta name="description" content="Guia completo de como gerenciar conteúdos, categorias e imagens na plataforma Escola Bíblica 360." />
      </Helmet>

      <Header />

      <TitleSection 
        title="Guia do Administrador" 
        description="Aprenda a publicar, editar e organizar todo o conteúdo do portal Escola Bíblica 360 através do seu painel de controle."
      />

      <main className="py-16 bg-background relative">
        <div className="container max-w-5xl">
          
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 mb-16 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold font-['Poppins'] mb-2">Pronto para começar?</h2>
              <p className="text-primary-foreground/80">Acesse o seu painel administrativo para colocar este guia em prática.</p>
            </div>
            <a 
              href="https://api.escolabiblica360.com/_/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto"
            >
              <Button size="lg" className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90 font-bold h-14 px-8 text-lg">
                Acessar Painel <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>

          <div className="space-y-24 border-l-2 border-border/50 pl-4 md:pl-0 md:border-none">
            
            <section id="acessar-painel">
              <SectionHeader 
                icon={Settings} 
                title="1. Acessar o Painel Admin" 
                description="O painel (PocketBase) é onde toda a gestão do site acontece." 
              />
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.15rem] md:before:ml-[1.85rem] before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:to-transparent">
                <StepCard 
                  step="1"
                  title="Acesse o endereço de administração"
                  description={<>Vá até o endereço oficial do painel de controle: <a href="https://api.escolabiblica360.com/_/" target="_blank" rel="noreferrer" className="text-accent hover:underline font-medium">https://api.escolabiblica360.com/_/</a></>}
                />
                <StepCard 
                  step="2"
                  title="Faça o Login"
                  description="Insira seu e-mail de administrador e a senha fornecida pela equipe técnica. Se esquecer a senha, entre em contato com o suporte."
                />
                <StepCard 
                  step="3"
                  title="Conheça as Collections (Coleções)"
                  description="No menu lateral esquerdo, você verá opções como 'posts', 'categories', 'downloads'. Cada uma delas representa uma área do site que você pode gerenciar."
                />
              </div>
            </section>

            <section id="criar-categorias">
              <SectionHeader 
                icon={FolderTree} 
                title="2. Criar Categorias" 
                description="Organize seus artigos em seções como 'Escatologia' ou 'Infantil'." 
              />
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.15rem] md:before:ml-[1.85rem] before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:to-transparent">
                <StepCard 
                  step="1"
                  title="Acesse a coleção 'categories'"
                  description="No menu esquerdo do painel, clique em 'categories' e depois no botão azul 'New record' (Novo registro) no canto superior direito."
                />
                <StepCard 
                  step="2"
                  title="Preencha os dados básicos"
                  description="O Slug deve sempre ser em letras minúsculas e sem acentos ou espaços (use traços)."
                  reference={
                    <>
                      <strong>name:</strong> Escola Dominical<br/>
                      <strong>slug:</strong> escola-dominical<br/>
                      <strong>description:</strong> Lições semanais para sua classe.
                    </>
                  }
                />
                <StepCard 
                  step="3"
                  title="Salvar"
                  description="Clique no botão verde 'Create' no rodapé para salvar a nova categoria. Ela aparecerá automaticamente no site."
                />
              </div>
            </section>

            <section id="criar-estudos">
              <SectionHeader 
                icon={PenTool} 
                title="3. Criar Estudos e Artigos" 
                description="O coração do seu portal. Como adicionar novos textos bíblicos." 
              />
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.15rem] md:before:ml-[1.85rem] before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:to-transparent">
                <StepCard 
                  step="1"
                  title="Novo Post"
                  description="Clique na coleção 'posts' e depois em 'New record'."
                />
                <StepCard 
                  step="2"
                  title="Título, Slug e Resumo"
                  description="O 'title' é o título principal. O 'slug' é como ele aparecerá na URL do site. O 'excerpt' é o pequeno texto de resumo que aparece nos cartões."
                  reference={
                    <>
                      <strong>title:</strong> A Graça de Deus<br/>
                      <strong>slug:</strong> a-graca-de-deus<br/>
                      <strong>excerpt:</strong> Um estudo profundo sobre o favor imerecido.
                    </>
                  }
                />
                <StepCard 
                  step="3"
                  title="Conteúdo (Content)"
                  description="Cole aqui o texto do seu estudo. Você pode usar tags HTML básicas como <b>texto</b> para negrito ou <br/> para pular linhas."
                />
                <StepCard 
                  step="4"
                  title="Selecionar Categoria e Status"
                  description="No campo 'category_id', clique e selecione a categoria correspondente. Em 'status', altere de 'draft' (rascunho) para 'published' (publicado)."
                />
              </div>

              <PracticalExample />
            </section>

            <section id="upload-imagens">
              <SectionHeader 
                icon={ImageIcon} 
                title="4. Fazer Upload de Imagens" 
                description="Como deixar seus artigos visualmente atraentes com capas e ilustrações." 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[hsl(var(--info))]/10 border border-[hsl(var(--info))]/20 rounded-2xl p-6">
                  <h4 className="font-bold text-[hsl(var(--info))] mb-2 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" /> Tamanhos Recomendados
                  </h4>
                  <ul className="space-y-2 text-sm text-foreground/80 list-disc list-inside ml-4">
                    <li><strong>Imagem de Capa (Featured):</strong> 1200x630 pixels</li>
                    <li><strong>Formatos aceitos:</strong> JPG, PNG, WebP</li>
                    <li><strong>Tamanho máximo:</strong> Procure manter abaixo de 300KB para o site carregar rápido.</li>
                  </ul>
                </div>
                <div className="bg-[hsl(var(--warning))]/10 border border-[hsl(var(--warning))]/20 rounded-2xl p-6">
                  <h4 className="font-bold text-[hsl(var(--warning))] mb-2">Sites gratuitos de imagens</h4>
                  <ul className="space-y-2 text-sm text-foreground/80 list-disc list-inside ml-4">
                    <li>Unsplash.com</li>
                    <li>Pexels.com</li>
                    <li>Pixabay.com</li>
                    <li className="list-none mt-2 text-xs opacity-75">Nunca use imagens do Google que possuam direitos autorais.</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.15rem] md:before:ml-[1.85rem] before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:to-transparent">
                <StepCard 
                  step="1"
                  title="Enviando a imagem"
                  description="Na tela de criação ou edição de um post, localize o campo 'featured_image' (ou campo de arquivo, dependendo do design do BD). Como nosso banco de dados usa links externos (URLs) para 'featured_image', você deve colar o link direto da imagem gerado no Unsplash ou no seu próprio servidor."
                  reference='https://images.unsplash.com/photo-123456789...'
                />
              </div>
            </section>

            <section id="criar-downloads">
              <SectionHeader 
                icon={FileDown} 
                title="5. Criar Downloads (PDFs)" 
                description="Como disponibilizar apresentações, PDFs e mapas mentais." 
              />
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.15rem] md:before:ml-[1.85rem] before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:to-transparent">
                <StepCard 
                  step="1"
                  title="Coleção de Downloads"
                  description="Acesse 'downloads' no menu esquerdo e clique em 'New record'."
                />
                <StepCard 
                  step="2"
                  title="Anexar o Arquivo"
                  description="No campo 'file' (tipo File), clique e selecione o PDF, PPT ou DOC do seu computador. O painel cuidará do upload."
                />
                <StepCard 
                  step="3"
                  title="Informações Visuais"
                  description="Preencha o título, descrição, e se aplicável, envie uma imagem de capa ('cover_image') para que os usuários vejam uma prévia do documento antes de baixar."
                />
              </div>
            </section>

            <section id="editar-deletar">
              <SectionHeader 
                icon={Trash2} 
                title="6. Editar e Deletar Conteúdos" 
                description="Como atualizar um texto antigo ou remover algo publicado por engano." 
              />
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.15rem] md:before:ml-[1.85rem] before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:to-transparent">
                <StepCard 
                  step="1"
                  title="Encontrar o registro"
                  description="Na lista de posts ou downloads, use a barra de busca no topo da página do painel para encontrar o artigo desejado pelo título."
                />
                <StepCard 
                  step="2"
                  title="Editar"
                  description="Clique na linha do registro. A tela de edição se abrirá. Faça suas alterações e clique em 'Save changes' no rodapé."
                />
                <StepCard 
                  step="3"
                  title="Ocultar (Não deletar)"
                  description="Se você quer que o post saia do site mas quer guardar o texto, apenas mude o campo 'status' de 'published' para 'draft'. Ele sumirá do site imediatamente."
                />
                <StepCard 
                  step="4"
                  title="Excluir Permanentemente"
                  description="Se realmente quiser apagar, clique no ícone de lixeira vermelha no canto inferior direito da tela de edição. ATENÇÃO: Esta ação não pode ser desfeita."
                />
              </div>
            </section>

            <section id="dicas">
              <SectionHeader 
                icon={Lightbulb} 
                title="7. Dicas e Boas Práticas" 
                description="Recomendações para manter seu portal profissional, rápido e seguro." 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold font-['Poppins'] mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
                    Slugs Únicos
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Nunca use o mesmo 'slug' para dois posts diferentes. O slug é o endereço único do artigo (como: /artigo/<b>meu-estudo</b>).
                  </p>
                </div>
                
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold font-['Poppins'] mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
                    Resumos Cativantes
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    O campo 'excerpt' (resumo) é vital. Ele é o texto que convence o usuário a clicar no seu cartão para ler mais. Seja claro e direto.
                  </p>
                </div>
                
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold font-['Poppins'] mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))] flex items-center justify-center text-sm">3</span>
                    Otimização de Imagens
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Passe suas imagens no <i>tinypng.com</i> ou ferramentas similares antes de usar. Imagens pesadas deixam o site lento para carregar no celular.
                  </p>
                </div>
                
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold font-['Poppins'] mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] flex items-center justify-center text-sm">4</span>
                    SEO Básico
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Sempre preencha os campos opcionais 'seo_title' e 'seo_description' se você quer que seu estudo seja encontrado facilmente no Google.
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default AdminGuidePage;
