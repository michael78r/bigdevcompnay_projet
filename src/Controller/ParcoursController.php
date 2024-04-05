<?php

namespace App\Controller;

use App\Entity\Parcours;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Symfony\Component\HttpFoundation\Response;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class ParcoursController extends AbstractController
{
    #[Route('/parcours', name: 'parcours_liste',methods:['GET'])]
    public function parcours_liste(ManagerRegistry $doctrine): Response
    {
        $repository = $doctrine->getRepository(Parcours::class);
        $pks = $repository->findAll();
        $data = [];

        foreach( $pks as $p ) {
        $data[] = [
            'id'=> $p->getId(),
            'nom'=> $p->getNom(),
            'annee'=> $p->getDate()
        ];
    }
        return $this->json($data);
    }

    #[Route('/parcours/{id}', name: 'findBy',methods:['GET'])]
    public function findBy(ManagerRegistry $doctrine, int $id): Response
    {
        $entityManager = $doctrine->getManager();

        $joueur_national = $entityManager->getRepository(Parcours::class)->findBy([
            'joueur' => $id,
        ]);
        return $this->json($joueur_national);
}
}