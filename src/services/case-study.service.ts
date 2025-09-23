import { Injectable, signal } from '@angular/core';
import { CaseStudy } from '../models/case-study.model';

@Injectable({
  providedIn: 'root'
})
export class CaseStudyService {
  private readonly caseStudies = signal<CaseStudy[]>([
    {
      slug: 'gorgias-rebranding',
      imageUrl: 'https://picsum.photos/seed/project1/1200/900',
      imageWidth: 1200,
      imageHeight: 900,
      title: 'Gorgias',
      description: 'Rebranding para um unicórnio.',
      tags: ['Branding', 'Website', 'Webflow'],
      client: 'Gorgias Inc.',
      timeline: '6 Meses',
      services: ['Brand Strategy', 'Visual Identity', 'Web Design', 'Webflow Development'],
      challenge: 'Gorgias, líder em atendimento ao cliente para e-commerce, superou sua identidade de marca inicial. Eles precisavam de uma marca mais sofisticada e escalável que refletisse sua posição de mercado como um unicórnio da tecnologia e atraísse clientes corporativos maiores.',
      solution: 'Realizamos uma fase de descoberta aprofundada, seguida por uma reformulação completa da marca. Isso incluiu um novo logotipo, paleta de cores, tipografia e um sistema de design abrangente. Em seguida, projetamos e desenvolvemos um novo site de marketing no Webflow, com foco em mensagens claras, visuais atraentes e uma experiência de usuário perfeita.',
      result: 'A nova identidade da marca foi aclamada, fortalecendo a percepção de mercado da Gorgias. O novo site obteve um aumento de 40% em leads qualificados e uma redução de 25% na taxa de rejeição nos primeiros três meses.',
      gallery: [
        { url: 'https://picsum.photos/seed/gorgias1/1200/800', width: 1200, height: 800 },
        { url: 'https://picsum.photos/seed/gorgias2/1200/800', width: 1200, height: 800 },
        { url: 'https://picsum.photos/seed/gorgias3/1200/800', width: 1200, height: 800 },
      ]
    },
    {
      slug: 'brex-b2b-brand-elevation',
      imageUrl: 'https://picsum.photos/seed/project2/1200/900',
      imageWidth: 1200,
      imageHeight: 900,
      title: 'Brex',
      description: 'Elevando a marca B2B.',
      tags: ['Branding', 'Website'],
      client: 'Brex',
      timeline: '4 Meses',
      services: ['Web Design', 'UI/UX', 'Content Strategy'],
      challenge: 'A Brex pretendia mudar sua percepção de marca de uma empresa de cartão de crédito focada em startups para um sistema operacional financeiro abrangente para empresas de todos os tamanhos. Seu site precisava refletir essa evolução e comunicar com eficácia uma gama mais ampla de ofertas de produtos.',
      solution: 'Nossa equipe redesenhou o site da Brex com uma abordagem modular e escalável. Introduzimos uma nova arquitetura de informação para melhor apresentar seu conjunto de produtos em expansão. O design focou em uma estética limpa e profissional, usando visualização de dados e estudos de caso para construir confiança e autoridade.',
      result: 'O site reformulado reposicionou com sucesso a Brex no espaço de tecnologia financeira B2B, contribuindo para um aumento de 60% nas consultas de nível empresarial. O engajamento do usuário nas páginas de produtos melhorou em 35%.',
      gallery: [
        { url: 'https://picsum.photos/seed/brex1/1200/800', width: 1200, height: 800 },
        { url: 'https://picsum.photos/seed/brex2/1200/800', width: 1200, height: 800 },
      ]
    },
    {
      slug: 'webflow-new-face',
      imageUrl: 'https://picsum.photos/seed/project3/1200/900',
      imageWidth: 1200,
      imageHeight: 900,
      title: 'Webflow',
      description: 'A nova cara do no-code.',
      tags: ['Website', 'Design System'],
      client: 'Webflow',
      timeline: '8 Meses',
      services: ['Product Design', 'Design System', 'UI/UX'],
      challenge: 'O Webflow precisava de um novo site de marketing que não apenas atendesse à sua base de usuários existente de designers, mas também atraísse clientes corporativos e equipes de marketing, demonstrando o poder e a flexibilidade da plataforma.',
      solution: 'Criamos um site altamente interativo e visualmente rico que ultrapassou os limites do que era possível com o Webflow. Também desenvolvemos um sistema de design abrangente no Figma que otimizou seu processo de design interno e garantiu a consistência da marca em todos os pontos de contato digitais.',
      result: 'O novo site se tornou uma referência na comunidade no-code, ganhando vários prêmios de design. Levou a um aumento significativo nas inscrições de empresas e foi elogiado por seu uso inovador de interações e animações.',
      gallery: [
        { url: 'https://picsum.photos/seed/webflow1/1200/800', width: 1200, height: 800 },
        { url: 'https://picsum.photos/seed/webflow2/1200/800', width: 1200, height: 800 },
        { url: 'https://picsum.photos/seed/webflow3/1200/800', width: 1200, height: 800 },
        { url: 'https://picsum.photos/seed/webflow4/1200/800', width: 1200, height: 800 },
      ]
    },
    {
      slug: 'sendinblue-brand-evolution',
      imageUrl: 'https://picsum.photos/seed/project4/1200/900',
      imageWidth: 1200,
      imageHeight: 900,
      title: 'Sendinblue',
      description: 'Evolução da marca e do website.',
      tags: ['Branding', 'Website', 'UI/UX'],
      client: 'Sendinblue',
      timeline: '5 Meses',
      services: ['Branding', 'Web Design', 'UI/UX'],
      challenge: 'A Sendinblue (agora Brevo) queria evoluir sua marca para comunicar melhor seus recursos de plataforma de marketing tudo-em-um, indo além de suas raízes de e-mail marketing. O objetivo era parecer mais moderno, amigável e acessível.',
      solution: 'Desenvolvemos uma identidade de marca vibrante e energética, com uma paleta de cores nova, ilustrações personalizadas e um tom de voz amigável. O novo site foi projetado para ser intuitivo e centrado no usuário, guiando os visitantes através do extenso conjunto de recursos da Sendinblue com clareza e facilidade.',
      result: 'O rebranding foi fundamental para o reposicionamento de mercado bem-sucedido da Sendinblue. O novo design do site melhorou a navegação do usuário e levou a um aumento de 30% nas inscrições para teste de suas ferramentas de marketing expandidas.',
      gallery: [
        { url: 'https://picsum.photos/seed/sendinblue1/1200/800', width: 1200, height: 800 },
        { url: 'https://picsum.photos/seed/sendinblue2/1200/800', width: 1200, height: 800 },
      ]
    }
  ]);

  getCaseStudies(): CaseStudy[] {
    return this.caseStudies();
  }

  getCaseStudyBySlug(slug: string): CaseStudy | undefined {
    return this.caseStudies().find(study => study.slug === slug);
  }
}