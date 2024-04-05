<?php

namespace App\Controller;


use App\Entity\Joueur;
use App\Entity\National;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

#[Route('/api', name: 'api_')]
class NationalController extends AbstractController
{
    #[Route('/all_national', name: 'all_national',methods:['GET'])]
    public function all_national(ManagerRegistry $doctrine): Response
    {
        $repository = $doctrine->getRepository(National::class);
        $nationals = $repository->findAll();
        $data = [];

        foreach( $nationals as $national ) {
        $data[] = [
            'id'=> $national->getId(),
            'nom'=> $national->getNom()
        ];
    }
        return $this->json($data);
    }

    #[Route('/national', name:'add_national',methods:['POST'])]
    public function add_national(ManagerRegistry $doctrine, Request $request): Response{

        $manager = $doctrine->getManager();
        $data = json_decode($request->getContent(), true);
        
        $national = new National();  
        $national->setNom((string)$data['nom']);
        $national->setPhoto((string)$data['photo']);
    
        $manager->persist($national);
    
        $manager->flush();
    
        return $this->json("michael");
    }
       


    #[Route('/national', name:'update_national',methods:['PUT'])]
    public function update_national(EntityManagerInterface $entityManager, Request $request): Response{

        $data = json_decode($request->getContent(), true);

        $joueur = $entityManager->getRepository(National::class)->find($data['id']);
        if(!$joueur){
            throw $this->createNotFoundException('Aucun produit trouvé pour l identifiant');
        }
        $joueur->setNom((string)$data['nom']);
        $joueur->setPhoto((string)$data['photo']);

        $entityManager->flush();

        return $this->json("michael");
    }

    #[Route('/national/{id}',name: "delete_national",methods:['DELETE'])]
    public function delete_national(ManagerRegistry $doctrine, int $id) {
        $entityManager = $doctrine->getManager();
    
        $joueur_national = $entityManager->getRepository(Joueur::class)->findBy([
            'national' => $id,
        ]);
    
        foreach ($joueur_national as $joueur) {
            $joueur->setIdNational(null);
        }
    
        $national = $entityManager->getRepository(National::class)->find($id);
        if (!$national) {
            throw $this->createNotFoundException('ID national NON TROUVÉ');
        }
        $entityManager->remove($national);
    
        $entityManager->flush();
        return $this->json($joueur_national);
    }
}
