<?php

namespace App\Controller;

use App\Entity\Club;
use App\Entity\Joueur;
use App\Entity\National;
use App\Entity\Parcours;
use App\Repository\JoueurRepository;
use App\Repository\MyRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

#[Route('/api', name: 'api_')]
class JoueurController extends AbstractController
{
    #[Route('/alldetails_joueur', name: 'alldetails_joueur',methods:['GET'])]
    public function alldetails_joueur(EntityManagerInterface $entityManagerInterface): Response
    {
        $repo = new MyRepository();
        $data = $repo->getAll_DetailsJoueur($entityManagerInterface);
        return $this->json($data);
    }

    #[Route('/add_joueur', name:'add_joueur',methods:['POST'])]
    public function add_joueur(ManagerRegistry $doctrine, Request $request): Response{

        $manager = $doctrine->getManager();
        $data = json_decode($request->getContent(), true);
        
        $joueur = new Joueur();  
        $joueur->setNom((string)$data['nom']);
        $joueur->setDateNaissance(new \DateTime($data['date_naissance']));
        $joueur->setNombreBut($data['nombre_but']);

        $clubId = (int)$data['club'];
        $nationalId = (int)$data['national'];

        $club = $doctrine->getRepository(Club::class)->find($clubId);
        $national = $doctrine->getRepository(National::class)->find($nationalId);
        
        $joueur->setIdClub($club);
        $joueur->setIdNational($national);

        foreach($data['parcours'] as $p){ 
            $parcours = new Parcours();
            $parcours->setNom((string)$p['nom']);
            $parcours->setDate((string)$p['annee']);
            $parcours->setJoueur($joueur);
            $manager->persist($parcours);
        }
    
        $manager->persist($joueur);
    
        $manager->flush();
    
        return $this->json(1);
    }

    #[Route('/joueur', name:'update_joueur',methods:['PUT'])]
    public function update_joueur(EntityManagerInterface $entityManager, Request $request): Response{

        $data = json_decode($request->getContent(), true);

        $joueur = $entityManager->getRepository(Joueur::class)->find($data['idjoueur']);
        if(!$joueur){
            throw $this->createNotFoundException('Aucun produit trouvé pour l identifiant');
        }
        $joueur->setNom((string)$data['nom']);
        $joueur->setDateNaissance(new \DateTime($data['date_naissance']));
        $joueur->setNombreBut($data['nombre_but']);

        $clubId = (int)$data['club'];
        $nationalId = (int)$data['national'];

        $club = $entityManager->getRepository(Club::class)->find($clubId);
        $national = $entityManager->getRepository(National::class)->find($nationalId);
        
        $joueur->setIdClub($club);
        $joueur->setIdNational($national);

        $entityManager->flush();

        return $this->json(1);
    }
    
    #[Route('/joueur/{id}',name: "joueur_delete",methods:['DELETE'])]
    public function delete_joueur(ManagerRegistry $doctrine, int $id) {
        $entityManager = $doctrine->getManager();
    
        $joueur_parcours = $entityManager->getRepository(Parcours::class)->findBy([
            'joueur' => $id,
        ]);
    
        if (!$joueur_parcours) {
            throw $this->createNotFoundException('IDJOUEUR NON TROUVÉ DANS PARCOURS');
        }
    
        foreach ($joueur_parcours as $parcours) {
            $entityManager->remove($parcours);
        }

        $joueur = $entityManager->getRepository(Joueur::class)->find($id);
        if (!$joueur) {
            throw $this->createNotFoundException('ID JOUEUR NON TROUVÉ');
        }
        $entityManager->remove($joueur);
    
        $entityManager->flush();
        return $this->json('Suppression réussie');
    }

    #[Route('/joueur_club/{id}',name: "joueur_club",methods:['GET'])]
    public function joueur_club(ManagerRegistry $doctrine, int $id) 
    {
        $cmRepository = new JoueurRepository($doctrine);
        $data = $cmRepository->findBy([
            'club' => $id , 
        ]);
        return $this->json($data);
    }

    #[Route('/joueur_national/{id}',name: "joueur_national",methods:['GET'])]
    public function joueur_national(ManagerRegistry $doctrine, int $id) 
    {
        $cmRepository = new JoueurRepository($doctrine);
        $data = $cmRepository->findBy([
            'national' => $id , 
        ]);
        return $this->json($data);
    }

}
