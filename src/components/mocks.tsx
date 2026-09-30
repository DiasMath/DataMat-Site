import { ChevronDown } from "lucide-react";
import symbol from "../assets/brand/datamat-symbol.svg";

export function DashboardMock() {
  return (
    <div className="dashboard-mock" aria-hidden="true">
      <div className="mock-bar">
        <span className="mock-brand">
          <img src={symbol} alt="" /> VISÃO DO NEGÓCIO
        </span>
        <span className="mock-period">
          Visão geral <ChevronDown size={12} />
        </span>
      </div>
      <div className="mock-content">
        <div className="mock-side">
          <span className="side-active">Visão geral</span>
          <span>Financeiro</span>
          <span>Vendas</span>
          <span>Estoque</span>
        </div>
        <div className="mock-main">
          <div className="mock-heading">
            <div>
              <small>PAINEL DE GESTÃO</small>
              <strong>Panorama da operação</strong>
            </div>
            <span>Exemplo ilustrativo</span>
          </div>
          <div className="stat-row">
            <div>
              <small>Receita</small>
              <strong>R$ 248 mil</strong>
              <em>↗ +8,2%</em>
            </div>
            <div>
              <small>Pedidos</small>
              <strong>1.284</strong>
              <em>↗ +4,6%</em>
            </div>
            <div>
              <small>Ticket médio</small>
              <strong>R$ 193</strong>
              <em>↗ +3,4%</em>
            </div>
          </div>
          <div className="charts-row">
            <div className="chart-card">
              <div className="chart-title">
                Evolução mensal <span>Receita × Meta</span>
              </div>
              <div className="bar-chart">
                {[41, 58, 49, 66, 60, 78, 72, 88, 76, 94, 84, 100].map(
                  (v, i) => (
                    <div className="bar-set" key={i}>
                      <i style={{ height: `${Math.max(v - 13, 25)}%` }} />
                      <b style={{ height: `${v}%` }} />
                    </div>
                  ),
                )}
              </div>
              <div className="chart-axis">
                <span>JAN</span>
                <span>MAR</span>
                <span>MAI</span>
                <span>JUL</span>
                <span>SET</span>
                <span>DEZ</span>
              </div>
            </div>
            <div className="chart-card donut-card">
              <div className="chart-title">
                Composição <span>Por canal</span>
              </div>
              <div className="donut" />
              <div className="legend">
                <span>
                  <i /> Direto
                </span>
                <span>
                  <i /> Digital
                </span>
                <span>
                  <i /> Outros
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BrandMock() {
  return (
    <div className="brand-mock" aria-hidden="true">
      <div className="mock-bar">
        <span className="mock-brand">PLANEJAMENTO / PRESENÇA</span>
        <span className="mock-period">Mês em visão</span>
      </div>
      <div className="brand-body">
        <div className="brand-calendar">
          <div className="brand-month">
            Setembro <span>Exemplo ilustrativo</span>
          </div>
          <div className="week-row">
            <span>01</span>
            <div>
              <b>Posicionamento</b>
              <small>Mensagem e proposta de valor</small>
            </div>
            <i />
          </div>
          <div className="week-row">
            <span>02</span>
            <div>
              <b>Conteúdo</b>
              <small>Tema educativo</small>
            </div>
            <i />
          </div>
          <div className="week-row">
            <span>03</span>
            <div>
              <b>Produto</b>
              <small>Apresentação da solução</small>
            </div>
            <i />
          </div>
          <div className="week-row">
            <span>04</span>
            <div>
              <b>Aprendizado</b>
              <small>Análise e ajustes</small>
            </div>
            <i />
          </div>
        </div>
        <div className="post-preview">
          <div className="preview-top">
            <span className="preview-avatar">D</span>
            <b>marca / exemplo</b>
            <span>•••</span>
          </div>
          <div className="preview-art">
            <span>
              Uma ideia clara
              <br />
              faz a diferença.
            </span>
            <div className="art-line" />
          </div>
          <div className="preview-footer">
            <span>Publicar</span>
            <span>→ Medir</span>
            <span>→ Aprender</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SiteMock() {
  return (
    <div className="site-mock" aria-hidden="true">
      <div className="browser-chrome">
        <span>
          <i />
          <i />
          <i />
        </span>
        <div>exemplo.com.br</div>
        <span>↗</span>
      </div>
      <div className="sample-site">
        <div className="sample-nav">
          <b>NORTE.</b>
          <span>
            Serviços&nbsp;&nbsp;&nbsp; Sobre&nbsp;&nbsp;&nbsp; Contato
          </span>
        </div>
        <div className="sample-hero">
          <div>
            <small>PRESENÇA COM PROPÓSITO</small>
            <h3>
              Uma mensagem clara
              <br />
              começa aqui.
            </h3>
            <p>
              Um exemplo de estrutura direta, preparada para apresentar a
              empresa.
            </p>
            <span className="sample-button">Conheça a empresa ↗</span>
          </div>
          <div className="sample-image">
            <span>N</span>
          </div>
        </div>
        <div className="sample-bottom">
          <span>Mensagem</span>
          <span>Estrutura</span>
          <span>Contato</span>
        </div>
      </div>
      <div className="phone-preview">
        <div className="phone-notch" />
        <b>NORTE.</b>
        <small>PRESENÇA COM PROPÓSITO</small>
        <strong>Uma mensagem clara começa aqui.</strong>
        <span className="phone-block" />
        <em>Conheça a empresa ↗</em>
      </div>
    </div>
  );
}
