<?php

namespace App\Form;

use App\Entity\Trajet;
use App\Entity\User;
use App\Entity\Voiture;
use Doctrine\DBAL\Types\JsonType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Positive;

class AddTrajetType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('dateDepart', TextType::class, [
                'mapped' => false,
                'label' => "Date",
                // 'widget' => 'single_text',
                'attr' => [
                    'class' => 'date-input',
                    'placeholder' => 'Date'
                ]
            ])
            ->add('heureDepart', DateTimeType::class, [
                'label' => "Heure",
                'widget' => 'single_text',
                'attr' => [
                    'hidden' => ''
                ]
            ])
            ->add('lieuDepart', TextType::class, [
                'label' => "Départ",
                'attr' => [
                        'placeholder' => 'Départ',
                        'class' => 'adresse-autocomplete', 
                        'autocomplete' => 'off'
                    ],
                ])
            ->add('lieuArrivee', TextType::class, [
                'label' => "Arrivée",
                'attr' => [
                    'placeholder' => 'Arrivée',
                    'class' => 'adresse-autocomplete', 
                    'autocomplete' => 'off'
                ],
                ])
            ->add('prixPersonne', IntegerType::class, [
                'label' => "Prix",
                'attr' => [
                    'placeholder' => 'Crédits (¢)',
                    'min' => 1,
                ],
                'constraints' => [
                    new Positive([
                        'message' => 'Le prix doit être un nombre positif.',
                    ]),
                ],

            ])
            ->add('voiture', TextType::class, [
                'mapped' => false,
                // 'class' => Voiture::class,
                // 'choice_label' => 'id',
                'attr' => [
                    'hidden' => '',
                ]
                
                ])
            ->add('googleData', HiddenType::class, [
                'mapped' => false,
                // 'attr' => [
                //     'hidden' => '',
                // ]
                
            ]);
        
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Trajet::class,
            'csrf_protection' => true,
            'csrf_field_name' => "_token",
            'csrf_token_id' => 'add_trajet'
        ]);
    }
}
