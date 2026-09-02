export const profile = {
  name: 'Ibrahim NASRI',
  role: 'Étudiant BTS SIO — SISR',
  headline:
    'Administration système · Réseaux · Virtualisation · Automatisation',
  bio: `Étudiant en deuxième année de BTS SIO option SISR (Solutions d'Infrastructure, Systèmes et Réseaux) au Lycée Younoussa Bamana, Mamoudzou, Mayotte. Je conçois, déploie et sécurise des infrastructures informatiques : serveurs, réseaux, virtualisation et scripts d'automatisation. Rigoureux, curieux et orienté production, je cherche un stage / une alternance pour mettre mes compétences en pratique.`,
  location: 'Mayotte',
  email: 'ibnasri.sio@gmail.com',
  phone: '+262 693 84 65 11',
  github: 'https://github.com/nasriibrahim2007',
  linkedin: 'https://www.linkedin.com/in/ibrahim-nasri-/',
}

export const stage = {
  title: 'Stage — Support Informatique & Administration Réseaux',
  company: 'AMB Sarl',
  address: '5 Rue de la Grande-Traversée, Kawéni 97600, Mayotte',
  master: 'M. Moussa',
  tutors: ['M. Ismael (tuteur terrain)', 'M. Davide (technicien atelier)'],
  duration: '5 semaines',
  period: '18 mai 2026 — 19 juin 2026',
  year: '2026',
  description:
    'Support informatique, maintenance matérielle et administration de réseaux d\'entreprise. AMB Sarl est spécialisée dans le conseil informatique, l\'entretien et le dépannage de parcs de machines, ainsi que la vente de mobilier de bureau professionnel.',
  missions: [
    {
      title: 'Support de proximité & maintenance matérielle',
      description:
        'Diagnostic de panne (NAS, PC portable), remplacement de composants, maintenance préventive (dépoussiérage, tests). Intervention en atelier et sur site client.',
    },
    {
      title: 'Diagnostic réseau & câblage',
      description:
        'Dépannage d\'incidents réseau sur site client (Soliha, Algoé, Longoni, Combani). Diagnostic de connectivité, vérification des équipements actifs.',
    },
    {
      title: 'Administration système & Active Directory',
      description:
        'Gestion des comptes utilisateurs, configuration d\'Active Directory, administration des identités Microsoft 365. Support utilisateur pour les problèmes de connexion et de pilotes.',
    },
    {
      title: 'Déploiement réseau & impression',
      description:
        'Installation de routeurs, antennes sans fil et déploiement de parcs d\'impression réseau. Configuration des postes de travail.',
    },
    {
      title: 'Sécurité & VPN',
      description:
        'Configuration de solutions VPN sécurisées. Initiation aux interventions électroniques complexes et à la maintenance préventive du matériel.',
    },
  ],
  skills: [
    'Active Directory',
    'M365',
    'VPN',
    'Réseau',
    'Maintenance',
    'Diagnostic',
    'Windows',
    'Câblage',
  ],
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
      'Conception, configuration et dépannage de réseaux d\'entreprise.',
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
    description: 'Automatisation des tâches d\'administration.',
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
      'Politiques de sécurité, pare-feu, sauvegardes et continuité d\'activité.',
    icon: 'shield',
    tags: ['iptables', 'SSL/TLS', 'VPN', 'Bacula'],
  },
]

export const projects = [
  {
    slug: 'stage',
    title: 'Rapport de Stage',
    category: 'Stage',
    year: '2026',
    image: '/placeholder-stage.svg',
    description:
      'Support informatique, maintenance matérielle et administration de réseaux d\'entreprise chez AMB Sarl, Mayotte.',
    tags: ['Infrastructure', 'Réseau', 'Active Directory', 'Mayotte'],
    link: '/Rapport de Stage def.pdf',
    longDescription:
      'Stage de 5 semaines chez AMB Sarl à Kawéni, Mayotte. Support informatique de proximité, maintenance matérielle (diagnostic NAS, réparation PC), administration Active Directory / Microsoft 365, déploiement réseau (routeurs, antennes, impression) et intervention terrain chez les clients (Soliha, Algoé, Longoni, Combani). Ce stage m\'a permis d\'appliquer les compétences du BTS SIO SISR face à des problématiques réelles en entreprise.',
    missions: [
      'Diagnostic de panne en atelier (NAS, PC portable, composants)',
      'Interventions terrain : diagnostic réseau et câblage chez les clients',
      'Administration Active Directory et gestion des identités M365',
      'Déploiement de routeurs, antennes sans fil et parcs d\'impression',
      'Support utilisateur et résolution d\'incidents logiciels',
    ],
  },
  {
    slug: 'cisco',
    title: 'Simulation Réseau Cisco',
    category: 'Projet',
    year: '2025',
    image: '/placeholder-cisco.svg',
    description:
      'Simulation d\'un réseau multi-sites avec Cisco Packet Tracer : routage OSPF, adressage IP et拓 topologie chaînée.',
    tags: ['Cisco', 'Packet Tracer', 'OSPF', 'Routage'],
    pdf: '/Simulation Reseau Cisco.pdf',
    download: '/Simulation_Reseau_Cisco.pkt',
    longDescription:
      'Simulation complète d\'un réseau multi-sites reliant 3 sites (A, B, C) avec routage dynamique OSPF sur Cisco Packet Tracer. Le Site B sert de pivot central. Chaque site est équipé d\'un routeur Cisco 2911 et d\'un switch 2960. Le projet comprend l\'adressage IP en /24 par site, le routage OSPF et la configuration des liaisons inter-routeurs.',
    missions: [
      'Conception de la topologie réseau multi-sites (A, B, C)',
      'Adressage IP et planification sous-réseaux /24',
      'Configuration du routage dynamique OSPF',
      'Configuration des routeurs Cisco 2911 et switchs 2960',
      'Tests de connectivité et vérification des tables de routage',
    ],
  },
  {
    slug: 'debian-lamp',
    title: 'Serveur Debian LAMP',
    category: 'Projet',
    year: '2025',
    image: '/placeholder-debian.svg',
    description:
      'Déploiement d\'un serveur Debian 13 LAMP sur Proxmox : Apache, MySQL, PHP, virtual hosts et sécurisation.',
    tags: ['Debian', 'Apache', 'MySQL', 'PHP', 'Proxmox'],
    link: '/Rapport_Serveur_Debian_LAMP.pdf',
    longDescription:
      'Déploiement complet d\'un serveur web LAMP sur une VM Debian 13 hébergée sous Proxmox VE. Installation d\'Apache avec virtual hosts, MySQL avec création de bases de données, PHP, puis sécurisation du serveur (pare-feu iptables, permissions, SSL). Le serveur debian-lamp est dimensionné avec 2 cœurs CPU, 2 Go de RAM et 20 Go de stockage sur bus SCSI.',
    missions: [
      'Création de la VM sous Proxmox VE (2 CPU, 2 Go RAM, 20 Go SCSI)',
      'Installation de Debian 13 et configuration réseau',
      'Déploiement d\'Apache avec virtual hosts',
      'Configuration de MySQL et création de bases de données',
      'Sécurisation : pare-feu iptables, permissions, SSL',
    ],
  },
  {
    slug: 'proxmox',
    title: 'Virtualisation Proxmox',
    category: 'Projet',
    year: '2025',
    image: '/placeholder-proxmox.svg',
    description:
      'Mise en place de Proxmox VE en virtualisation imbriquée (nested) avec VirtualBox : configuration réseau et résolution d\'incidents.',
    tags: ['Proxmox', 'Virtualisation', 'VirtualBox', 'Nested'],
    link: '/Rapport proxmox.pdf',
    longDescription:
      'Installation de Proxmox VE en virtualisation imbriquée (nested virtualization) dans VirtualBox. Activation de la virtualisation matérielle via VBoxManage, configuration réseau en mode bridged, et résolution des conflits techniques liés à l\'environnement imbriqué. Infrastructure de base pour le déploiement de VMs Debian et Windows.',
    missions: [
      'Configuration de la VM hôte VirtualBox (Debian 64 bits, 2 CPU, 4 Go RAM, 32 Go VDI)',
      'Activation de la virtualisation imbriquée (nested-hw-virt)',
      'Configuration réseau en mode accès par pont (Bridged)',
      'Installation et configuration de Proxmox VE',
      'Résolution des incidents techniques (conflits réseau, performance)',
    ],
  },
]

export const blogPosts = [
  {
    slug: 'debian-hardening',
    title: 'Sécuriser un serveur Debian en production',
    date: '2026-06-15',
    category: 'Sécurité',
    excerpt:
      'Basé sur les pratiques rencontrées en stage chez AMB Sarl : SSH, pare-feu iptables, mises à jour, gestion des identités.',
    source: 'https://www.shpv.fr/blog/ipv6-deploiement-2026/',
    sourceName: 'SHPV',
    content: [
      'Sécuriser un serveur Debian est une étape essentielle dans tout déploiement en production. En stage chez AMB Sarl, j\'ai été confronté à des problématiques réelles de maintenance et de sécurité des postes clients.',
      'Les bonnes pratiques que j\'ai pu observer : mises à jour régulières du système, gestion stricte des comptes utilisateurs via Active Directory, et maintenance préventive du matériel (dépoussiérage, tests de composants).',
      'Pour aller plus loin, des ressources comme le blog SHPV documentent le déploiement IPv6 et les stratégies de sécurité réseau en 2026.',
    ],
  },
  {
    slug: 'proxmox-nested-lab',
    title: 'Proxmox VE en virtualisation imbriquée : mon lab d\'apprentissage',
    date: '2026-05-20',
    category: 'Virtualisation',
    excerpt:
      'Comment j\'ai mis en place Proxmox VE dans VirtualBox pour découvrir l\'hyperviseur sans serveur dédié.',
    source: 'https://f84.allfab.fr/posts/2026/20260529-perfect-homelab-serie-10/',
    sourceName: 'F84 Lab',
    content: [
      'Pour mon projet de virtualisation, je n\'avais pas de serveur physique dédié. J\'ai donc opté pour la virtualisation imbriquée (nested) avec Proxmox VE installé dans VirtualBox.',
      'Les étapes clés : activation de nested-hw-virt via VBoxManage, configuration réseau en mode bridged, et résolution des conflits techniques liés à cet environnement.',
      'Le blog F84 documente une approche similaire mais plus avancée avec du Proxmox en cluster HA, ce qui montre les possibilités d\'évolution de ce type de lab.',
    ],
  },
  {
    slug: 'cisco-ospf-lab',
    title: 'Apprendre le routage OSPF avec Cisco Packet Tracer',
    date: '2026-04-10',
    category: 'Réseaux',
    excerpt:
      'Mon retour d\'expérience sur la simulation d\'un réseau multi-sites avec routage dynamique OSPF.',
    source: 'https://www.mikelossmann.me/blog/',
    sourceName: 'Mike Lossmann',
    content: [
      'Cisco Packet Tracer est l\'outil idéal pour apprendre les réseaux sans matériel physique. Dans mon projet, j\'ai simulé un réseau multi-sites reliant 3 sites avec routage OSPF.',
      'Les concepts essentiels : topologie en chaîne (Site A ← Site B central → Site C), adressage /24 par site, et configuration OSPF pour le routage dynamique inter-sites.',
      'Le blog de Mike Lossmann propose des articles détaillés sur OSPF (LSAs, algorithmes SPF, areas) qui complètent parfaitement la pratique sur Packet Tracer.',
    ],
  },
]

export const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Projets', href: '#projets' },
  { label: 'Compétences', href: '#competences' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]
