<?php

namespace App\Form;

use App\Entity\Trajet;
use App\Entity\User;
use App\Entity\Voiture;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SearchTrajetType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            
            // ->add('heureDepart', null, [
            //     'required' => true,
            //     'label' => false,
            //     'widget' => 'single_text',
            //     'attr' => [
            //         'placeholder' => 'Heure de départ'
            //     ],
            // ])
            ->add('lieuDepart', TextType::class, [
                'required' => true,
                'label' => false,
                'attr' => [
                    'placeholder' => 'Départ',
                    'class' => 'adresse-autocomplete', 
                    'autocomplete' => 'off'
                ],
            ])
            // ->add('dateArrivee', null, [
            //     'widget' => 'single_text'
            // ])
            // ->add('heureArrivee', null, [
            //     'required' => true,
            //     'label' => false,
            //     'widget' => 'single_text',
            //     'attr' => [
            //         'placeholder' => 'Heure d\'arrivée'
            //     ],
            // ])
            ->add('lieuArrivee', TextType::class, [
                'required' => true,
                'label' => false,
                'attr' => [
                    'placeholder' => 'Arrivée',
                    'class' => 'adresse-autocomplete', 
                    'autocomplete' => 'off'
                ],
            ])
            ->add('dateDepart', TextType::class , [
                // 'widget' => 'single_text',
                'mapped' => false,
                'required' => true,
                'label' => false,
                'attr' => [
                    'placeholder' => 'Date',
                    'class' => "date-input"
                ],
            ])
            ->add('nbPlace', null, [
                'required' => true,
                'mapped' => false,
                'label' => false,
                'attr' => [
                    'placeholder' => 'Passagers',
                    'hidden' => 'true'
                ],
            ])
//             ->add('statut')
//             ->add('prixPersonne')
//             ->add('voiture', EntityType::class, [
//                 'class' => Voiture::class,
// 'choice_label' => 'id',
//             ])
//             ->add('participants', EntityType::class, [
//                 'class' => User::class,
// 'choice_label' => 'id',
// 'multiple' => true,
//             ])
//             ->add('chauffeur', EntityType::class, [
//                 'class' => User::class,
// 'choice_label' => 'id',
//             ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Trajet::class,
        ]);
    }
}
