<?php

namespace App\Form;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Constraints\Callback;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Security\Core\Validator\Constraints\UserPassword;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Regex;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

class EditMailType extends AbstractType
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email', EmailType::class, [
                'attr' => [
                    'placeholder' => "Adresse email"
                ],
                'label' => 'Email',
                'constraints' => [
                    new Callback(function ($email, ExecutionContextInterface $context) {
                        $user = $context->getRoot()->getData(); // objet User
            
                        // Si l'email a changé
                        if ($user instanceof User && $email !== $user->getEmail()) {
                            $existingUser = $this->em->getRepository(User::class)->findOneBy(['email' => $email]);
            
                            if ($existingUser) {
                                $context->buildViolation('Cette adresse mail est déjà utilisée.')
                                    ->addViolation();
                            }
                        }
                    })
                ]
            ])

            ->add('password', PasswordType::class, [
                'mapped' => false,
                'label' => 'Mot de passe actuel',
                'invalid_message' => 'Mot de passe actuel incorrect',
                'constraints' => [
                    new UserPassword([
                        'message' => 'Le mot de passe actuel est incorrect.',
                    ]),
                ],
                'attr' => [
                    'placeholder' => "********"
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
            'csrf_token_id' => 'mail_password'
        ]);
    }
}
