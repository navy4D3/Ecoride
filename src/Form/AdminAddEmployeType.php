<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Regex;

class AdminAddEmployeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email', EmailType::class, [
                'attr' => [
                    'placeholder' => "Adresse email"
                ],
                'label' => 'Email'
            ])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'invalid_message' => 'Les mots de passes doivent correspondrent.',
                'options' => [
                    'attr' => [
                        'class' => 'password-field'
                ]],
                'required' => true,
                'first_options'  => [
                    'label' => 'Mot de passe',
                    'attr' => [
                        'placeholder' => '********',
                    ],
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Merci de renseigner un mot de passe.',
                        ]),
                        new Length([
                            'min' => 8,
                            'minMessage' => 'Le mot de passe doit contenir au moins {{ limit }} caractères.',
                            // max length allowed by Symfony for security reasons
                            'max' => 4096,
                        ]),
                        new Regex( [
                            'pattern'=> "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/",
                            'message' => 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.'
                        ])
                    ],
                ],
                'second_options' => [
                    'label' => 'Confirmation du mot de passe',
                    'attr' => [
                        'placeholder' => '********',
                    ],
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
            'csrf_token_id' => 'admin_add_employe'
        ]);
    }
}
