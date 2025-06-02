// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="About/intro.html"><strong aria-hidden="true">1.</strong> Intro</a></li><li class="chapter-item expanded "><a href="About/math.html"><strong aria-hidden="true">2.</strong> Math</a></li><li class="chapter-item expanded "><a href="About/index.html"><strong aria-hidden="true">3.</strong> About</a></li><li class="chapter-item expanded "><a href="About/traceroute.html"><strong aria-hidden="true">4.</strong> Traceroute</a></li><li class="chapter-item expanded "><a href="CyberSecurity/cve_data.html"><strong aria-hidden="true">5.</strong> Cve Data</a></li><li class="chapter-item expanded "><a href="CyberSecurity/MITR3ATTACK/APT_GROUPS.html"><strong aria-hidden="true">6.</strong> APT GROUPS</a></li><li class="chapter-item expanded "><a href="CyberSecurity/MITR3ATTACK/Mitigations.html"><strong aria-hidden="true">7.</strong> Mitigations</a></li><li class="chapter-item expanded "><a href="CyberSecurity/MITR3ATTACK/Tactics.html"><strong aria-hidden="true">8.</strong> Tactics</a></li><li class="chapter-item expanded "><a href="CyberSecurity/MITR3ATTACK/Techniques.html"><strong aria-hidden="true">9.</strong> Techniques</a></li><li class="chapter-item expanded "><a href="CyberSecurity/MITR3ATTACK/Threat_software.html"><strong aria-hidden="true">10.</strong> Threat Software</a></li><li class="chapter-item expanded "><a href="CyberSecurity/MITR3ATTACK/Wazuh_indexes.html"><strong aria-hidden="true">11.</strong> Wazuh Indexes</a></li><li class="chapter-item expanded "><a href="CyberSecurity/mitre_website.html"><strong aria-hidden="true">12.</strong> Mitre Website</a></li><li class="chapter-item expanded "><a href="CyberSecurity/payloads.html"><strong aria-hidden="true">13.</strong> Payloads</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="CyberSecurity/wazuh_threat_intel/MITR3ATTACK/APT_GROUPS.html"><strong aria-hidden="true">13.1.</strong> APT GROUPS</a></li></ol></li><li class="chapter-item expanded "><a href="Docker/docker_cheat.html"><strong aria-hidden="true">14.</strong> Docker Cheat</a></li><li class="chapter-item expanded "><a href="Docker/docker_storage.html"><strong aria-hidden="true">15.</strong> Docker Storage</a></li><li class="chapter-item expanded "><a href="GeneralHacking/Exfiltration.html"><strong aria-hidden="true">16.</strong> Exfiltration</a></li><li class="chapter-item expanded "><a href="GeneralHacking/Msfvenom.html"><strong aria-hidden="true">17.</strong> Msfvenom</a></li><li class="chapter-item expanded "><a href="Linux/vim_conf.html"><strong aria-hidden="true">18.</strong> Vim Conf</a></li><li class="chapter-item expanded "><a href="math/math.html"><strong aria-hidden="true">19.</strong> Math</a></li><li class="chapter-item expanded "><a href="math/op-amps.html"><strong aria-hidden="true">20.</strong> Op-Amps</a></li><li class="chapter-item expanded "><a href="OperatingSystems/Linux/git_commands.html"><strong aria-hidden="true">21.</strong> Git Commands</a></li><li class="chapter-item expanded "><a href="OperatingSystems/Linux/GitHub_Copilot.html"><strong aria-hidden="true">22.</strong> GitHub Copilot</a></li><li class="chapter-item expanded "><a href="OperatingSystems/Linux/i3_conf.html"><strong aria-hidden="true">23.</strong> I3 Conf</a></li><li class="chapter-item expanded "><a href="OperatingSystems/Linux/intro.html"><strong aria-hidden="true">24.</strong> Intro</a></li><li class="chapter-item expanded "><a href="OperatingSystems/Linux/keys_bind.html"><strong aria-hidden="true">25.</strong> Keys Bind</a></li><li class="chapter-item expanded "><a href="OperatingSystems/Linux/Linux.html"><strong aria-hidden="true">26.</strong> Linux</a></li><li class="chapter-item expanded "><a href="OperatingSystems/Linux/lsp.html"><strong aria-hidden="true">27.</strong> Lsp</a></li><li class="chapter-item expanded "><a href="OperatingSystems/Linux/mariadb.html"><strong aria-hidden="true">28.</strong> Mariadb</a></li><li class="chapter-item expanded "><a href="OperatingSystems/Linux/nvim_setup.html"><strong aria-hidden="true">29.</strong> Nvim Setup</a></li><li class="chapter-item expanded "><a href="OperatingSystems/Linux/ping.html"><strong aria-hidden="true">30.</strong> Ping</a></li><li class="chapter-item expanded "><a href="OperatingSystems/Linux/index.html"><strong aria-hidden="true">31.</strong> Linux</a></li><li class="chapter-item expanded "><a href="OperatingSystems/Linux/search_engine.html"><strong aria-hidden="true">32.</strong> Search Engine</a></li><li class="chapter-item expanded "><a href="OperatingSystems/Linux/test.html"><strong aria-hidden="true">33.</strong> Test</a></li><li class="chapter-item expanded "><a href="OperatingSystems/Linux/tmux_cheat.html"><strong aria-hidden="true">34.</strong> Tmux Cheat</a></li><li class="chapter-item expanded "><a href="OperatingSystems/Linux/traceroute.html"><strong aria-hidden="true">35.</strong> Traceroute</a></li><li class="chapter-item expanded "><a href="OperatingSystems/Linux/vim_conf.html"><strong aria-hidden="true">36.</strong> Vim Conf</a></li><li class="chapter-item expanded "><a href="OperatingSystems/operating_system.html"><strong aria-hidden="true">37.</strong> Operating System</a></li><li class="chapter-item expanded "><a href="OperatingSystems/Windows/Bypass_login.html"><strong aria-hidden="true">38.</strong> Bypass Login</a></li><li class="chapter-item expanded "><a href="OperatingSystems/Windows/tmux_windows.html"><strong aria-hidden="true">39.</strong> Tmux Windows</a></li><li class="chapter-item expanded "><a href="OperatingSystems/Windows/Windows_bypass_login.html"><strong aria-hidden="true">40.</strong> Windows Bypass Login</a></li><li class="chapter-item expanded "><a href="PHP/php_modules.html"><strong aria-hidden="true">41.</strong> Php Modules</a></li><li class="chapter-item expanded "><a href="posts/company.html"><strong aria-hidden="true">42.</strong> Company</a></li><li class="chapter-item expanded "><a href="posts/customers.html"><strong aria-hidden="true">43.</strong> Customers</a></li><li class="chapter-item expanded "><a href="posts/High-memory_CPU-usage.html"><strong aria-hidden="true">44.</strong> High Memory  Vs CPU Usage</a></li><li class="chapter-item expanded "><a href="posts/index.html"><strong aria-hidden="true">45.</strong> Posts</a></li><li class="chapter-item expanded "><a href="posts/TheWindowsKernel.html"><strong aria-hidden="true">46.</strong> The Windows Kernel</a></li><li class="chapter-item expanded "><a href="Productivity/Buffers.html"><strong aria-hidden="true">47.</strong> Buffers</a></li><li class="chapter-item expanded "><a href="Productivity/Symlinks.html"><strong aria-hidden="true">48.</strong> Symlinks</a></li><li class="chapter-item expanded "><a href="Productivity/tmux_cheat.html"><strong aria-hidden="true">49.</strong> Tmux Cheat</a></li><li class="chapter-item expanded "><a href="Productivity/vim.html"><strong aria-hidden="true">50.</strong> Vim</a></li><li class="chapter-item expanded "><a href="Python/Python_twitter.html"><strong aria-hidden="true">51.</strong> Python Twitter</a></li><li class="chapter-item expanded "><a href="Python/usingTwitterAPI.html"><strong aria-hidden="true">52.</strong> Using Twitter API</a></li><li class="chapter-item expanded "><a href="reference.html"><strong aria-hidden="true">53.</strong> Reference</a></li><li class="chapter-item expanded "><a href="SoftwareDevelopment/PKGBUILD.html"><strong aria-hidden="true">54.</strong> PKGBUILD</a></li><li class="chapter-item expanded "><a href="SoftwareDevelopment/Swig.html"><strong aria-hidden="true">55.</strong> Swig</a></li><li class="chapter-item expanded "><a href="SoftwareDevelopment/WindowsUIFrameworks.html"><strong aria-hidden="true">56.</strong> Windows UI Frameworks</a></li><li class="chapter-item expanded "><a href="Telecomms/engineering.html"><strong aria-hidden="true">57.</strong> Engineering</a></li><li class="chapter-item expanded "><a href="WWW/httpd.html"><strong aria-hidden="true">58.</strong> Httpd</a></li><li class="chapter-item expanded "><a href="WWW/mariadb-mysql.html"><strong aria-hidden="true">59.</strong> Mariadb-Mysql</a></li><li class="chapter-item expanded "><a href="WWW/mdbook.html"><strong aria-hidden="true">60.</strong> Mdbook</a></li><li class="chapter-item expanded "><a href="WWW/WORDPRES.html"><strong aria-hidden="true">61.</strong> WORDPRES</a></li><li class="chapter-item expanded "><a href="WWW/wordpress.html"><strong aria-hidden="true">62.</strong> Wordpress</a></li><li class="chapter-item expanded "><a href="WWW/Yahoo/yahoo.html"><strong aria-hidden="true">63.</strong> Yahoo</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
