<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class DevenirChauffeurType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder

            ->add('preferences', TextType::class, [
                'mapped' => false,
                'attr' => [
                    'hidden' => '',
                ]
            ])

            ->add('description', TextareaType::class, [
                'required' => true,
                'attr' => [
                    'placeholder' => 'Décris-toi en quelques lignes',
                    'rows' => 4],
            ])

            ->add('hasVoiture', CheckboxType::class, [
                'mapped' => false,
                'required' => true,
                'invalid_message' => 'Vous devez renseigner au moins une voiture pour devenir chauffeur.',
                'attr' => [
                    'hidden' => '',
                    'class' => 'voiture-input'
                ]
                
            ]);
        
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'csrf_protection' => true,
            'csrf_field_name' => "_token",
            'csrf_token_id' => 'devenir_chauffeur'
        ]);
    }
}
