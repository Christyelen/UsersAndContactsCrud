using System;
using System.Collections.Generic;


namespace Atividade1
{
    public class SuportesBalanceados
    {
        public static bool SequenciaDeSuportesValida(string s)
        {
            var pilha = new Stack<char>();
            var paresDeSuportes = new Dictionary<char, char>
        {
            { ')', '(' },
            { '}', '{' },
            { ']', '[' }
        };

            foreach (char ch in s)
            {
                if (ch == '(' || ch == '{' || ch == '[')
                {
                    pilha.Push(ch);
                }
                else if (ch == ')' || ch == '}' || ch == ']')
                {
                    if (pilha.Count == 0 || pilha.Pop() != paresDeSuportes[ch])
                    {
                        return false;
                    }
                }
                else
                {
                    throw new ArgumentException($"Caractere inválido encontrado: {ch}");
                }
            }

            return pilha.Count == 0;
        }

        public static void Main(string[] args)
        {
            while (true)
            {
                Console.WriteLine("Digite uma sequência de parênteses (ou pressione Esc para sair):");
                string entrada = LerEntradaOuEsc();

                if (entrada == null)
                {
                    break;
                }

                bool sequenciaValida = SequenciaDeSuportesValida(entrada);
                Console.WriteLine($"A sequência é válida? {sequenciaValida}");
            }
        }

        private static string LerEntradaOuEsc()
        {
            string entrada = "";
            ConsoleKeyInfo keyInfo;
            char[] caracteresValidos = { '(', ')', '{', '}', '[', ']' };

            while (true)
            {
                keyInfo = Console.ReadKey(intercept: true);

                if (keyInfo.Key == ConsoleKey.Escape)
                {
                    return null;
                }
                else if (keyInfo.Key == ConsoleKey.Enter)
                {
                    Console.WriteLine();
                    break;
                }
                else if (Array.Exists(caracteresValidos, c => c == keyInfo.KeyChar))
                {
                    Console.Write(keyInfo.KeyChar);
                    entrada += keyInfo.KeyChar;
                }
                else
                {
                    Console.WriteLine("\nCaractere inválido! Apenas parênteses, chaves e colchetes são permitidos.");
                }
            }

            return entrada;
        }
    }
}

