<?php

namespace App\Controller;


use App\Entity\Joueur;
use App\Entity\Club;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;



#[Route('/api', name: 'api_')]
class ClubController extends AbstractController
{
    #[Route('/all_club', name: 'all_club',methods:['GET'])]
    public function all_club(ManagerRegistry $doctrine): Response
    {
        $repository = $doctrine->getRepository(Club::class);
        $clubs = $repository->findAll();
        $data = [];

        foreach( $clubs as $club ) {
        $data[] = [
            'id'=> $club->getId(),
            'nom'=> $club->getNom()
        ];
    }
        return $this->json($data);
    }


    #[Route('/club', name:'add_club',methods:['POST'])]
    public function add_club(ManagerRegistry $doctrine, Request $request): Response{

        $manager = $doctrine->getManager();
        $data = json_decode($request->getContent(), true);
        
        $club = new Club();  
        $club->setNom((string)$data['nom']);
        $club->setPhoto((string)$data['photo']);
    
        $manager->persist($club);
    
        $manager->flush();
    
        return $this->json(1);
    }
    

    #[Route('/club', name:'update_club',methods:['PUT'])]
    public function update_club(EntityManagerInterface $entityManager, Request $request): Response{

        $data = json_decode($request->getContent(), true);

        $joueur = $entityManager->getRepository(Club::class)->find($data['id']);
        if(!$joueur){
            throw $this->createNotFoundException('Aucun produit trouvé pour l identifiant');
        }
        $joueur->setNom((string)$data['nom']);
        $joueur->setPhoto((string)$data['photo']);

        $entityManager->flush();

        return $this->json(1);
    }

    #[Route('/club/{id}',name: "delete_club",methods:['DELETE'])]
    public function delete_club(ManagerRegistry $doctrine, int $id) {
        $entityManager = $doctrine->getManager();
    
        $joueur_club = $entityManager->getRepository(Joueur::class)->findBy([
            'club' => $id,
        ]);
    
        foreach ($joueur_club as $joueur) {
            $joueur->setIdClub(null);
        }
    
        $club = $entityManager->getRepository(Club::class)->find($id);
        if (!$club) {
            throw $this->createNotFoundException('ID club NON TROUVÉ');
        }
        $entityManager->remove($club);
    
        $entityManager->flush();
        return $this->json($joueur_club);
    }

}
