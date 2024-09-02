using Atividade1;
using NUnit.Framework;
using System;

namespace Testes.TesteAtividade1
{

    [TestFixture]
    public class SuportesBalanceadosTest
    {
        private string suportes;

        [SetUp]
        public void Setup()
        {
            suportes = "()";
        }

        [Test]
        public void SequenciaDeSuportesValida_ValidaSequenciaCorreta()
        {
            bool result = SuportesBalanceados.SequenciaDeSuportesValida(suportes);

            Assert.That(result, Is.EqualTo(true));
        }

        [Test]
        public void CaracterInvalido_ThrowsException()
        {
            var ex = Assert.Throws<ArgumentException>(() => SuportesBalanceados.SequenciaDeSuportesValida("a"));
            Assert.That(ex.Message, Is.EqualTo("Caractere inválido encontrado: a"));
        }

        [Test]
        public void SequenciaComCaracterInvalido_ThrowsException()
        {
            var ex = Assert.Throws<ArgumentException>(() => SuportesBalanceados.SequenciaDeSuportesValida("[]a[]"));
            Assert.That(ex.Message, Is.EqualTo("Caractere inválido encontrado: a"));
        }

    }
}
