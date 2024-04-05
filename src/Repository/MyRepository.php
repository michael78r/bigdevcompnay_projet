<?php 

namespace App\Repository;

use Doctrine\ORM\EntityManagerInterface;

class MyRepository{
   
    private function findAll_($sql, EntityManagerInterface $entityManager): array
    {   //echo $sql;
        $conn = $entityManager->getConnection();
        $resultSet = $conn->executeQuery($sql);
        return $resultSet->fetchAllAssociative();
    }

    private function findOneBy_($sql, EntityManagerInterface $entityManager): array
    {  
        $conn = $entityManager->getConnection();
        $resultSet = $conn->executeQuery($sql);
        return $resultSet->fetchAssociative();
    }

    public function getAll_DetailsJoueur(EntityManagerInterface $entityManager):array {
        return $this->findAll_("select * from v_joueur", $entityManager);
    }

    public function getOne_DetailsJoueur(EntityManagerInterface $entityManager) {
        return $this->findOneBy_("select * from joueur where id = 2", $entityManager);
    }

}