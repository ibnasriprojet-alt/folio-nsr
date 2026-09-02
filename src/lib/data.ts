export const profile = {
  name: 'Ibrahim NASRI',
  role: 'Étudiant BTS SIO — SISR',
  headline:
    'Administration système · Réseaux · Virtualisation · Automatisation',
  bio: `Étudiant en deuxième année de BTS SIO option SISR (Solutions d'Infrastructure, Systèmes et Réseaux). Je conçois, déploie et sécurise des infrastructures informatiques : serveurs, réseaux, virtualisation et scripts d'automatisation. Rigoureux, curieux et orienté production, je cherche un stage / une alternance pour mettre mes compétences en pratique.`,
  location: 'La Réunion',
  email: 'ibnasri.sio@gmail.com',
  phone: '+262 693 84 65 11',
  github: 'https://github.com/nasriibrahim2007',
  linkedin: 'https://www.linkedin.com/in/ibrahim-nasri-/',
}

export const skills = [
  {
    title: 'Systèmes',
    description:
      "Installation, configuration et administration de serveurs Linux et Windows.",
    icon: 'server',
    tags: ['Debian', 'Ubuntu', 'Windows Server', 'Active Directory'],
  },
  {
    title: 'Réseaux',
    description:
      'Conception, configuration et dépannage de réseaux d’entreprise.',
    icon: 'network',
    tags: ['TCP/IP', 'VLAN', 'Cisco', 'Firewall', 'Routage'],
  },
  {
    title: 'Virtualisation',
    description:
      'Déploiement et gestion de machines virtuelles et de conteneurs.',
    icon: 'box',
    tags: ['Proxmox', 'VMware', 'Docker', 'VirtualBox'],
  },
  {
    title: 'Scripting & Automatisation',
    description: 'Automatisation des tâches d’administration.',
    icon: 'terminal',
    tags: ['Bash', 'PowerShell', 'Python', 'SQL'],
  },
  {
    title: 'Supervision',
    description:
      'Surveillance de la disponibilité et des performances des services.',
    icon: 'activity',
    tags: ['Zabbix', 'Grafana', 'SNMP', 'Nagios'],
  },
  {
    title: 'Sécurité',
    description:
      'Politiques de sécurité, pare-feu, sauvegardes et continuité d’activité.',
    icon: 'shield',
    tags: ['iptables', 'SSL/TLS', 'VPN', 'Bacula'],
  },
]

export const projects = [
  {
    title: 'Rapport de Stage',
    category: 'Stage',
    year: '2025',
    description:
      'Mission en entreprise dans le domaine des systèmes d’information et réseaux : mise en pratique des compétences d’administration et d’infrastructure.',
    tags: ['Infrastructure', 'Réseau', 'Administration'],
    link: '/Rapport de Stage def.pdf',
  },
  {
    title: 'Simulation Réseau Cisco',
    category: 'Projet',
    year: '2025',
    description:
      'Conception et simulation d’un réseau d’entreprise avec Cisco Packet Tracer : topologie, adressage et routage.',
    tags: ['Cisco', 'Packet Tracer', 'Routage'],
    pdf: '/Simulation Reseau Cisco.pdf',
    download: '/Simulation_Reseau_Cisco.pkt',
  },
  {
    title: 'Serveur Debian LAMP',
    category: 'Projet',
    year: '2025',
    description:
      'Déploiement complet d’un serveur LAMP (Linux, Apache, MySQL, PHP) sur Debian, avec configuration et sécurisation.',
    tags: ['Debian', 'Apache', 'MySQL', 'PHP'],
    link: '/Rapport_Serveur_Debian_LAMP.pdf',
  },
  {
    title: 'Virtualisation Proxmox',
    category: 'Projet',
    year: '2025',
    description:
      'Mise en place d’une infrastructure virtualisée avec Proxmox VE : création de machines virtuelles, stockage et sauvegardes.',
    tags: ['Proxmox', 'Virtualisation', 'VMs'],
    link: '/Rapport proxmox.pdf',
  },
]

export const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Projets', href: '#projets' },
  { label: 'Compétences', href: '#competences' },
  { label: 'Contact', href: '#contact' },
]
