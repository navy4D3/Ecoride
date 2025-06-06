<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;

class RegistrationStepTwoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('photo_profil', FileType::class, [
                'label' => "Photo de profil",
                'required' => false,
                'mapped' => false,
                'attr' => [
                    'hidden' => 'true'
                ],
                'constraints' => [
                    new File([
                        'maxSize' => '5M',
                        'mimeTypes' => [
                            'image/jpeg',
                            'image/jpg',
                            'image/png',
                            'image/webp',
                            'image/heic',
                            'image/heif',
                            'image/bmp',
                            'image/tiff',
                        ],
                        'mimeTypesMessage' => 'Merci d\'uploader une image valide (JPEG, PNG, HEIC...)',
                    ]),
                ],
            ])
            ->add('nom', TextType::class, [
                'attr' => [
                    'placeholder' => 'Dupont'
                ]
            ])
            ->add('prenom', TextType::class, [
                'attr' => [
                    'placeholder' => 'Jean'
                ]
            ])
            ->add('date_naissance', DateType::class, [
                
                'label' => 'Date de naissance',
                'widget' => 'single_text',
                'attr' => [
                    'class' => 'picker',
                    'max' => (new \DateTime())->modify('-1 day')->format('Y-m-d')
                ]

            ])
            ->add('telephone', TelType::class, [
                'attr' => [
                    'placeholder' => '06 12 34 56 78',
                    'oninput' => "this.value = this.value.replace(/[^0-9 ]/g, '')",
                ],
            ])
            ->add('adresse', TextType::class, [
                'attr' => [
                    'placeholder' => '2 rue du covoiturage',
                    'class' => 'adresse-autocomplete', 
                    'autocomplete' => 'off'
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'csrf_protection' => true,
            'csrf_field_name' => "_token",
            'csrf_token_id' => 'register_step_two'
        ]);
    }
}
