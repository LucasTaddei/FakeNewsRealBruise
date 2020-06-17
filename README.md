# FakeNewsRealBruise

<i>Par Jessica Chautems, Marielle Grass, Lucas Taddei & Léa Keller.</i>

Projet réalisé dans le cadre du cours Création d'un Jeu vidéo 2D donné par Isaac Pante et accompagné par Loris Rimaz, tuteur

Faculté des Lettres - Université de Lausanne - Semestre d'automne 2019. 


<h2> Overview : </h2>

<p>Pour le cours <i>Développement de jeux vidéo 2D</i>, offert dans le cursus du master d’Humanités Numériques, l’objectif était de faire un jeu de médiation culturelle sur un sujet à choix. On a choisi de faire un jeu sur les fake news, sur leur culture et leur violence.</p>
    <p><i>Fake News, Real Bruise</i> est un jeu de rythme dans lequel on est poussé à partager le plus de news possibles. Le jeu veut simuler de manière exagérée le processus d’impulsivité créée par la culture du partage, qui nous amène toujours à partager les nouvelles le plus vite possible (en déterminant le rythme), sans se préoccuper de leur véridicité. Enfin, le but du jeu est de montrer que le partage sans <i>fact checking</i> peut être très dangereux, en expliquant les raisons et les conséquences.</p>

<img src="https://github.com/LucasTaddei/FakeNewsRealBruise/commit/f92037f147930f97fd258ba1ec182ab0875f6d09#commitcomment-39976578" alt="alt text" width="350" height="350">
<h2> Gameplay : </h2>

<p> À l’aide des flèches directionnelles, le joueur ou la joueuse doit appuyer au bon moment sur la flèche correspondante qui tombe du haut de l’écran vers le bas (suivant la recette des jeux de rythme classique, à l'instar de Guitar Hero, etc...). Chaque combo de 5 flèches consécutives permet de partager une nouvelle.</p>

<h2> Mécaniques : </h2>

<p> Si au début le rythme de la musique coïncide avec le rythme des flèches qui tombent, cela va vite changer. En fait, le jeu joue sur la divergence toujours majeure entre le rythme des flèches qui tombent et le rythme de la musique. Les flèches, de manière automatique, vont de plus en plus vite, en symbolisant le rythme accéléré poussé par la culture du partage. Les titres des news apparaissent à l’écran, mais de cette manière on est poussé à ne pas les lires. La musique, au contraire, reste toujours avec le même rythme, en symbolisant la société.</p>
<p> Pourtant ces deux mondes, celui du partage obsessif et celui de la "vraie" société, s’influencent. Après avoir partagé 5 news, un élément sonore s’ajoute à la musique de fond. De même, après avoir partagé 15/35/40/50 news. La nature de ces éléments sonores supplémentaires s’aggrave de manière proportionnelle au partage des fake news. Cela débute avec des bruits de « grand magasin » à des bruits des « révoltes dans la rue », pour finir avec des bruits de bombardements. Ces bruits se superposent à la musique en créant une sensation de chaos et de confusion, qui éventuellement peut amener le joueur ou la joueuse à faire des erreurs. On peut dire, donc, que les conséquences des partages de fake news (bien sûr portés à l’extrême pour le jeu) rendent plus difficile le jeu.
Une fois le morceau musical terminé, le gameplay termine, mais pas l’expérience. En fait, accompagné par des bruits de guerre distants et des animations qui illustrent la destruction, le joueur ou la joueuse est amené·e à lire des informations concernant les fake news, le danger qu’elles peuvent causer et la procédure à suivre pour partager des contenus de manière correct. </p>

<h2> License et modules </h2>

<p>Ce programme est un logiciel gratuit.  Fake News, Real Bruise a été développé avec le framework de développement web en Javascript Phaser 3 dans sa version 3.22.0

Les modules utilisés sont les suivants:

    node.js

Le package suivant doit être installé par le terminal pour que l'application marche: npm install phaser@3.22.0

Copyright © 2019 - l'équipe de développement: Jessica Chautems, Marielle Grass, Lucas Taddei & Léa Keller. </p>
