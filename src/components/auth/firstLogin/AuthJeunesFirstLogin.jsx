"use client"

import React, { useState, useRef } from 'react';
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { LanguageSelector } from '@/components/LanguageSelector';
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import { Checkbox } from "@/components/ui/checkbox"

import Logo from "../../../../public/logoJeune.png";
import Illustration from "../../../../public/2862289.webp";

const schema = z.object({
    identifier: z.string().min(1, "Veuillez saisir votre identifiant"),
    password: z.string()
    .min(8, 'Le mot de passe doit faire au moins 8 caractères')
    .max(16, 'Le mot de passe ne peut pas dépasser 16 caractères'),
});

const AuthJeunes = ({nextStep}) => {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const form = useForm({
        defaultValues: {
          identifier: "",
          password: "",
        },
        resolver: zodResolver(schema),
    });

    const alertDialogTriggerRef = useRef(null);

    const onSubmit = (data) => {
        if (alertDialogTriggerRef.current) {
            alertDialogTriggerRef.current.click();
        }
    };

    const handleCheckboxChange = () => {
        setTermsAccepted(!termsAccepted);
    };

    return (
        <div className="lg:h-screen lg:flex lg:items-center lg:justify-center lg:bg-gray-400">
            <div className="mt-1 flex justify-between lg:hidden w-full">
                <div className="ml-auto mr-2">
                    <LanguageSelector />
                </div>
            </div>

            <div className="lg:min-h-[550px] lg:max-w-7xl lg:border lg:rounded-3xl xl:min-w-[1000px] lg:min-w-[900px] bg-white sm:flex xl:mx-48">
                <div className="w-full md:w-1/2 flex flex-col justify-center mt-8">
                    <div className='px-4 md:px-0 md:ml-8 lg:ml-12'>
                        <div className="flex items-center justify-center -ml-2 mb-4">
                            <Image src={Logo} alt="Logo" height={200} width={250} />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="identifier"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email ou CIN ou CNE ou Code Massar</FormLabel>
                                                <FormControl>
                                                    <Input className="sm:w-96 max-w-sm" placeholder="Email ou CIN ou CNE ou Code Massar" {...field} />
                                                </FormControl>
                                                <FormMessage className="sm:w-96 max-w-sm" />
                                            </FormItem>
                                        )}
                                    />
                                    
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="sm:inline">Mot de Passe</FormLabel>
                                                <FormDescription className="hidden sm:inline border-b-2 border-blue-600 text-blue-600 cursor-pointer sm:ml-40">
                                                    Mot de passe oublié?
                                                </FormDescription>
                                                <FormControl>
                                                    <Input className="sm:w-96 max-w-sm" type="password" id="password" placeholder="Mot de Passe" {...field} />
                                                </FormControl>
                                                <FormMessage className="sm:w-96 max-w-sm" />
                                                <FormDescription className="sm:hidden border-b-[1px] inline-block border-blue-600 text-blue-600 cursor-pointer">
                                                    Mot de passe oublié?
                                                </FormDescription>
                                            </FormItem>
                                        )}
                                    />
                                    <button type="submit" className="bg-blue-900 rounded-2xl mt-4 py-1 w-full max-w-sm text-white font-medium">Se Connecter</button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <button ref={alertDialogTriggerRef}></button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Conditions d'utilisation de la plateforme</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <div className="flex items-center justify-center space-x-2">
                                                <Checkbox id="terms" checked={termsAccepted} onCheckedChange={handleCheckboxChange} />
                                                <label
                                                    htmlFor="terms"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    J'ai lu et j'accepte les conditions d'utilisation de la plateforme
                                                </label>
                                            </div>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction disabled={!termsAccepted} onClick={() => {nextStep() }}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </form>
                            </Form>
                        </div>
                        <h4 className="text-xs text-center text-gray-700 mt-4">Vous n'avez pas de compte ? <span className="font-semibold border-b-2 border-gray-700 cursor-pointer">Inscrivez-vous</span></h4>
                    </div>
                    <div className="hidden lg:block ml-3 mt-auto">
                        <LanguageSelector />
                    </div>
                </div>
                <div className="hidden md:block md:w-1/2 md:mt-20 lg:mt-28 md:animate-bounce-slow">
                    <Image src={Illustration} alt="Illustration" layout="responsive" height={1000} width={450} />
                </div>
            </div>
        </div>
    );
};

export default AuthJeunes;