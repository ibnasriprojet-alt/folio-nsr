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

export const stage = {
  title: 'Stage — Administration Système & Réseaux',
  company: 'Entreprise IT — La Réunion',
  duration: '2 mois',
  year: '2025',
  missions: [
    {
      title: 'Administration serveurs',
      description:
        'Installation et configuration de serveurs Linux (Debian) et Windows Server. Gestion des comptes utilisateurs, des permissions et des services réseau.',
    },
    {
      title: 'Gestion du réseau',
      description:
        'Configuration des équipements réseau (switchs, routeurs), mise en place de VLAN, dépannage des incidents de connectivité.',
    },
    {
      title: 'Virtualisation',
      description:
        'Déploiement de VMs sous Proxmox VE, migration de services, configuration du stockage et des sauvegardes automatiques.',
    },
    {
      title: 'Automatisation',
      description:
        'Écriture de scripts Bash et PowerShell pour automatiser les tâches répétitives : sauvegardes, mises à jour, monitoring.',
    },
    {
      title: 'Supervision',
      description:
        'Installation et configuration de Zabbix pour la supervision des équipements et services critiques.',
    },
  ],
  skills: [
    'Linux',
    'Windows Server',
    'Proxmox',
    'Réseau',
    'Scripting',
    'Monitoring',
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
    year: '2025',
    image: '/placeholder-stage.svg',
    description:
      'Mission en entreprise dans le domaine des systèmes d\'information et réseaux : mise en pratique des compétences d\'administration et d\'infrastructure.',
    tags: ['Infrastructure', 'Réseau', 'Administration'],
    link: '/Rapport de Stage def.pdf',
    longDescription:
      'Stage de deux mois en entreprise specialisee en infrastructure IT a La Réunion. Mission principale : administration de serveurs Linux et Windows, gestion du réseau d\'entreprise (VLAN, routage), déploiement de VMs sous Proxmox et mise en place de solutions de supervision (Zabbix). Ce stage m\'a permis de mettre en pratique les compétences acquises en cours et de découvrir les réalités du métier d\'admin系统meur systèmes et réseaux.',
    missions: [
      'Administration de serveurs Debian et Windows Server',
      'Configuration réseau : switchs, VLAN, routage',
      'Déploiement et gestion de VMs sous Proxmox VE',
      'Écriture de scripts Bash pour automatiser les sauvegardes',
      'Installation et paramétrage de Zabbix',
    ],
  },
  {
    slug: 'cisco',
    title: 'Simulation Réseau Cisco',
    category: 'Projet',
    year: '2025',
    image: '/placeholder-cisco.svg',
    description:
      'Conception et simulation d\'un réseau d\'entreprise avec Cisco Packet Tracer : topologie, adressage et routage.',
    tags: ['Cisco', 'Packet Tracer', 'Routage'],
    pdf: '/Simulation Reseau Cisco.pdf',
    download: '/Simulation_Reseau_Cisco.pkt',
    longDescription:
      'Simulation complete d\'un reseau d\'entreprise en utilisant Cisco Packet Tracer. Ce projet comprend la conception de la topologie reseau, l\'adressage IP, la configuration des routeurs et switchs, la mise en place de VLAN et le routage inter-VLAN. J\'ai egalement configure des ACL pour securiser le trafic et du NAT pour l\'acces Internet.',
    missions: [
      'Conception de la topologie reseau (LAN/WAN)',
      'Adressage IP et planification sous-reseaux',
      'Configuration des routeurs Cisco (routage OSPF)',
      'Mise en place de VLAN et routage inter-VLAN',
      'Configuration de ACL et NAT',
    ],
  },
  {
    slug: 'debian-lamp',
    title: 'Serveur Debian LAMP',
    category: 'Projet',
    year: '2025',
    image: '/placeholder-debian.svg',
    description:
      'Déploiement complet d\'un serveur LAMP (Linux, Apache, MySQL, PHP) sur Debian, avec configuration et sécurisation.',
    tags: ['Debian', 'Apache', 'MySQL', 'PHP'],
    link: '/Rapport_Serveur_Debian_LAMP.pdf',
    longDescription:
      'Deploiement complet d\'un serveur web LAMP sur Debian. Ce projet couvre l\'installation et la configuration de Apache, MySQL et PHP, la mise en place de virtual hosts, la securisation du serveur (pare-feu, permissions, SSL) et le deploiement d\'une application web de test.',
    missions: [
      'Installation de Debian et configuration reseau',
      'Deploiement d\'Apache avec virtual hosts',
      'Configuration de MySQL et creation de bases de donnees',
      'Installation et configuration de PHP',
      'Securisation : pare-feu iptables, permissions, SSL',
    ],
  },
  {
    slug: 'proxmox',
    title: 'Virtualisation Proxmox',
    category: 'Projet',
    year: '2025',
    image: '/placeholder-proxmox.svg',
    description:
      'Mise en place d\'une infrastructure virtualisée avec Proxmox VE : création de machines virtuelles, stockage et sauvegardes.',
    tags: ['Proxmox', 'Virtualisation', 'VMs'],
    link: '/Rapport proxmox.pdf',
    longDescription:
      'Mise en place d\'une infrastructure virtualisee avec Proxmox VE. Ce projet comprend l\'installation de Proxmox sur un serveur physique, la creation et la gestion de VMs (Debian, Windows), la configuration du stockage (ZFS, NFS), la mise en place de sauvegardes automatiques et la gestion des snapshots.',
    missions: [
      'Installation et configuration de Proxmox VE',
      'Creation de VMs Debian et Windows',
      'Configuration du stockage ZFS et NFS',
      'Mise en place de sauvegardes automatiques',
      'Gestion des snapshots et restauration',
    ],
  },
]

export const blogPosts = [
  {
    slug: 'debian-hardening',
    title: 'Sécuriser un serveur Debian en 10 étapes',
    date: '2025-06-15',
    category: 'Sécurité',
    excerpt:
      'Guide pratique pour renforcer la sécurité d\'un serveur Debian : SSH, pare-feu, mises à jour, auditing.',
    content: [
      'Sécuriser un serveur Debian est une étape essentielle dans tout déploiement en production. Voici les 10 étapes que j\'applique systématiquement.',
      '1. Mise à jour du système — Appliquer toutes les mises à jour de sécurité et activer les mises à jour automatiques avec unattended-upgrades.',
      '2. SSH sécurisé — Désactiquer l\'authentification par mot de passe, utiliser uniquement les clés SSH, changer le port par défaut.',
      '3. Pare-feu — Configurer iptables ou nftables pour n\'autoriser que les ports nécessaires (22/SSH, 80/HTTP, 443/HTTPS).',
      '4. Fail2ban — Installer Fail2ban pour bloquer automatiquement les tentatives d\'intrusion.',
      '5. Utilisateurs — Créer un utilisateur dédié avec sudo, désactiver root pour la connexion SSH.',
      '6. Permissions — Vérifier les permissions des fichiers critiques, surtout /etc/shadow et /etc/passwd.',
      '7. SELinux/AppArmor — Activer SELinux ou AppArmor pour le confinement des processus.',
      '8. Audit — Installer auditd pour tracer les actions sensibles sur le système.',
      '9. Sauvegardes — Mettre en place des sauvegardes automatiques avec BorgBackup ou Bacula.',
      '10. Monitoring — Configurer Zabbix ou Prometheus pour surveiller les alertes de sécurité.',
    ],
  },
  {
    slug: 'proxmox-backup-strategy',
    title: 'Stratégie de sauvegarde Proxmox VE',
    date: '2025-05-20',
    category: 'Virtualisation',
    excerpt:
      'Comment mettre en place une stratégie de sauvegarde fiable avec Proxmox VE et BorgBackup.',
    content: [
      'La sauvegarde est critique dans un environnement virtualisé. Voici ma stratégie de sauvegarde pour Proxmox VE.',
      'Pourquoi BorgBackup ? Compression efficace, déduplication, chiffrement, et restoration simple. Idéal pour les environnements Proxmox.',
      'Étape 1 : Installation de BorgBackup sur l\'hyperviseur Proxmox.',
      'Étape 2 : Création du dépôt Borg avec chiffrement AES-256.',
      'Étape 3 : Script de sauvegarde automatique des VMs via vzdump + Borg.',
      'Étape 4 : Planification avec cron (sauvegarde quotidienne, rétention 30 jours).',
      'Étape 5 : Tests de restauration réguliers pour valider l\'intégrité des sauvegardes.',
      'Résultat : sauvegarde chiffrée, dédupliquée, avec restauration en quelques minutes.',
    ],
  },
  {
    slug: 'cisco-packet-tracer-lab',
    title: 'Mon lab Cisco Packet Tracer pour débutants',
    date: '2025-04-10',
    category: 'Réseaux',
    excerpt:
      'Comment configurer un premier lab réseau avec Cisco Packet Tracer pour apprendre le routage.',
    content: [
      'Cisco Packet Tracer est l\'outil idéal pour apprendre les réseaux sans matériel physique. Voici comment créer un premier lab.',
      'Prérequis : Télécharger Cisco Packet Tracer (gratuit avec Cisco Networking Academy).',
      'Étape 1 : Créer la topologie — 2 routeurs, 2 switchs, 4 PC.',
      'Étape 2 : Adressage IP — Attribuer les adresses IP et masques de sous-réseau.',
      'Étape 3 : Configuration des routeurs — Interfaces, routage statique ou OSPF.',
      'Étape 4 : VLAN — Créer des VLANs sur les switchs et configurer le routage inter-VLAN.',
      'Étape 5 : Tests — Ping entre tous les postes, vérification des tables de routage.',
      'Conseil : Sauvegarder régulièrement votre fichier .pkt et documenter chaque étape.',
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
