<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\EnumType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\NotNull;

class AdminEditUserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email', EmailType::class, [
                'constraints' => [
                    new Email([
                        'message' => 'Email invalide.'
                    ]),
                ]
            ])
            ->add('nom', TextType::class, [
                'empty_data' => '',
                'constraints' => [
                    new NotBlank([
                        'message' => 'Le nom ne peut pas être nul.'
                    ]),
                ]
            ])
            ->add('prenom', TextType::class, [
                'empty_data' => '',
                'constraints' => [
                    new NotBlank([
                        'message' => 'Le prénom ne peut pas être nul.'
                    ]),
                ]
            ])
            ->add('telephone', TextType::class, [
                'constraints' => [
                    new NotBlank([
                        'message' => 'Le telephone ne peut pas être nul.'
                    ]),
                ]
            ])
            ->add('adresse', TextType::class, [
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
            ->add('date_naissance', DateType::class, [
                'label' => 'Date de naissance',
                'widget' => 'single_text',
                'attr' => [
                    'class' => 'picker',
                    'max' => (new \DateTime())->modify('-1 day')->format('Y-m-d')
                ]
            ])
            ->add('description', TextareaType::class, [
                'attr' => [
                    'placeholder' => "Description de l'utilisateur"
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
            'csrf_token_id' => 'admin_edit_user'
        ]);
    }
}
