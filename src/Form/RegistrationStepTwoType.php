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
use Symfony\Component\Validator\Constraints\LessThanOrEqual;
use Symfony\Component\Validator\Constraints\NotBlank;

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
                        'maxSize' => '20M',
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
                'empty_data' => '',
                'attr' => [
                    'placeholder' => 'Dupont'
                ],
                'constraints' => [
                    new NotBlank([
                        'message' => 'Le nom ne peut pas être nul.'
                    ]),
                ]
                
            ])
            ->add('prenom', TextType::class, [
                'empty_data' => '',
                'attr' => [
                    'placeholder' => 'Jean'
                ],
                'constraints' => [
                    new NotBlank([
                        'message' => 'Le prénom ne peut pas être nul.'
                    ]),
                ]
            ])
            ->add('date_naissance', DateType::class, [
                
                'label' => 'Date de naissance',
                'widget' => 'single_text',
                'attr' => [
                    'class' => 'picker',
                    'max' => (new \DateTime())->modify('-16 years')->format('Y-m-d')
                ],
                'constraints' => [
                    new LessThanOrEqual([
                        'value' => (new \DateTime())->modify('-16 years'),
                        'message' => 'Vous devez avoir au moins 16 ans pour vous inscrire.'
                    ]),
                ],

            ])
            ->add('telephone', TelType::class, [
                'empty_data' => '',
                'attr' => [
                    'placeholder' => '06 12 34 56 78',
                    'oninput' => "this.value = this.value.replace(/[^0-9 ]/g, '')",
                ],
                'constraints' => [
                    new NotBlank([
                        'message' => 'Le téléphone ne peut pas être nul.'
                    ]),
                ]
            ])
            ->add('adresse', TextType::class, [
                'empty_data' => '',
                'attr' => [
                    'placeholder' => '2 rue du covoiturage',
                    'class' => 'adresse-autocomplete', 
                    'autocomplete' => 'off'
                ],
                'constraints' => [
                    new NotBlank([
                        'message' => "L'adresse ne peut pas être nul."
                    ]),
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
