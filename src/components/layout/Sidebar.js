const Sidebar = () => {
  return (
    <aside
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-menu-theme"
    >
      <div className="app-brand demo">
        <a href="/" className="app-brand-link">
          <span className="app-brand-logo demo">
            IoT
          </span>
          <span className="app-brand-text demo menu-text fw-bold ms-2">
            Farm
          </span>
        </a>

        <a
          href="/"
          className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
        >
          <i className="bx bx-chevron-left bx-sm align-middle"></i>
        </a>
      </div>

      <div className="menu-inner-shadow"></div>

      <ul className="menu-inner py-1">
        <li className="menu-item">
          <a
            href="/"
            className="menu-link"
          >
            <i className="menu-icon tf-icons bx bx-home-circle"></i>
            <div data-i18n="Dashboards">Dashboards</div>
          </a>
        </li>
        <li className="menu-item">
          <a
            href="/plants"
            className="menu-link"
          >
            <i className="menu-icon tf-icons bx bxs-tree"></i>
            <div data-i18n="Plants">Plants</div>
          </a>
        </li>
        <li className="menu-item">
          <a
            href="/automations"
            className="menu-link"
          >
            <i className="menu-icon tf-icons bx bxs-analyse"></i>
            <div data-i18n="Automation History">Automation History</div>
          </a>
        </li>
        <li className="menu-item">
          <a
            href="/installation-config"
            className="menu-link"
          >
            <i className="menu-icon tf-icons bx bx-cog"></i>
            <div data-i18n="Installation Config">Installation Config</div>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
