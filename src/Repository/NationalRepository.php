<?php

namespace App\Repository;

use App\Entity\National;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<National>
 *
 * @method National|null find($id, $lockMode = null, $lockVersion = null)
 * @method National|null findOneBy(array $criteria, array $orderBy = null)
 * @method National[]    findAll()
 * @method National[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NationalRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, National::class);
    }

//    /**
//     * @return National[] Returns an array of National objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('n')
//            ->andWhere('n.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('n.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?National
//    {
//        return $this->createQueryBuilder('n')
//            ->andWhere('n.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
