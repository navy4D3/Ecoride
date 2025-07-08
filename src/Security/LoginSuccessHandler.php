<?php 

namespace App\Security;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;

class LoginSuccessHandler implements AuthenticationSuccessHandlerInterface
{
    private RouterInterface $router;

    public function __construct(RouterInterface $router)
    {
        $this->router = $router;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token): RedirectResponse
    {
        $user = $token->getUser();
        $roles = $token->getRoleNames();
        $userEmail = $user->getUserIdentifier();



        // Redirection en fonction du rôle
        if (in_array('ROLE_ADMIN', $roles, true) || $userEmail == 'admin@ecoride.com') {
            return new RedirectResponse($this->router->generate('app_admin'));
        }

        if (in_array('ROLE_EMPLOYE', $roles, true)) {
            return new RedirectResponse($this->router->generate('app_employe'));
        }

        // Redirection par défaut
        return new RedirectResponse($this->router->generate('app_home'));
    }
}
