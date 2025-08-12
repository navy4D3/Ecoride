<?php

namespace App\Form;

use App\Entity\Avis;
use App\Entity\User;
use Doctrine\DBAL\Types\BooleanType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\RadioType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AvisType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            
            ->add('isPositive', ChoiceType::class, [
                'choices'  => [
                    '' => '',
                    'Oui' => true,
                    'Non' => false,
                ],
                'label' => "Ton trajet s'est bien passé ?",
                'attr' => [
                    'hidden' => ''
                ],
                
            ])
            ->add('note', IntegerType::class, [
                'label' => 'Une note sur 5 ?',
                'attr' => [
                    'hidden' => ''
                ]
            ])

            ->add('commentaire', TextareaType::class, [
                'label' => 'Un commentaire pour finir ?',
                'required' => false,
                'attr' => [
                    'placeholder' => "Ce trajet était..."
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Avis::class,
            'csrf_protection' => true,
            'csrf_field_name' => "_token",
            'csrf_token_id' => 'add_avis'
        ]);
    }
}
