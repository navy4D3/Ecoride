<?php

namespace App\Form;

use App\Entity\User;
use App\Entity\Voiture;
use App\Enum\Couleur;
use App\Enum\Marque;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\EnumType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Choice;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Positive;

class AddVoitureType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $brands = array_map(fn($case) => $case->value, Marque::cases());

        $builder
            ->add('immatriculation', TextType::class)
            ->add('date_premiere_immatriculation', DateType::class)
            ->add('marque', TextType::class, [
                'mapped' => false,
                'attr' => [
                    'autocomplete' => 'off',
                    'data-marque-list' => json_encode($brands)
                ],
                'constraints' => [
                    new NotBlank(),
                    new Choice([
                        'choices' => $brands,
                        'message' => 'Veuillez sélectionner une marque valide dans la liste.',
                    ]),
                ],
            ])
            ->add('modele', TextType::class)
            ->add('couleur', EnumType::class, [
                'class' => Couleur::class,
                'choice_label' => fn(Couleur $choice) => $choice->value,
                'placeholder' => 'Selectionner', //  ajoute une option vide
                'required' => true
            ])
            ->add('isElectric', CheckboxType::class, [
                'label' => "Electrique",
                'required' => false
            ])
            ->add('places', IntegerType::class, [
                'label' => "Places",
                'attr' => [
                    'placeholder' => 'Places (conducteur inclus)',
                    'min' => 2,
                ],
                'constraints' => [
                    new Positive([
                        'message' => 'Le nombre de places doit être supérieur à 1.',
                    ]),
                ],
            ])
            ->add('surnom', TextType::class, [
                'label' => "Surnom",
                'attr' => [
                    'placeholder' => 'Ma titine'
                ]
            ])
            
            
            
//             ->add('proprietaire', EntityType::class, [
//                 'class' => User::class,
// 'choice_label' => 'id',
//             ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Voiture::class,
            'csrf_protection' => true,
            'csrf_field_name' => "_token",
            'csrf_token_id' => 'add_voiture'
        ]);
    }
}
