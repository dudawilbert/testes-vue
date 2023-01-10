import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'
describe('Uma lance sem valor minimo', () => {
  test('não aceita lance com valor menor do que zero', () => {
    // monta o lance
    const wrapper = mount(Lance)
    // procura o input
    const input = wrapper.find('input')
    // seta valor no input negativo
    input.setValue(-100)
    // escutando o evento 'novo-lance'
    const lancesEmitidos = wrapper.emitted('novo-lance')
    // subimisssão do formulario
    wrapper.trigger('submit')
    // esperamos lances emitidos undeifnes
    expect(lancesEmitidos).toBeUndefined()
  })

  test('emite um lance quando o valor é maior do que zero', () => {
    // monta o lance
    const wrapper = mount(Lance)
    // procura o input
    const input = wrapper.find('input')
    // seta valor no input positivo
    input.setValue(100)
    // subimisssão do formulario
    wrapper.trigger('submit')
    // escutando o evento 'novo-lance'
    const lancesEmitidos = wrapper.emitted('novo-lance')
    // esperamos que tenha 1 lance
    expect(lancesEmitidos).toHaveLength(1)
  })
  test('emite o valor esperado de um lance valido', () => {
    // monta o lance
    const wrapper = mount(Lance)
    // procura o input
    const input = wrapper.find('input')
    // seta valor no input positivo
    input.setValue(100)
    // subimisssão do formulario
    wrapper.trigger('submit')
    // escutando o evento 'novo-lance'
    const lancesEmitidos = wrapper.emitted('novo-lance')
    //   [
    //       [100]
    //   ]
    const lance = parseInt(lancesEmitidos[0][0])
    expect(lance).toBe(100)
  })
})
describe('um lance com valor minimo', () => {
  test('todos os lances devem possuir um valor maior do que o minimo informado', () => {
    // cria o componente passando a prop lanceMinimo
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    // procura o input
    const input = wrapper.find('input')
    // passa um valor para o input
    input.setValue(400)
    // aciona o evento submit
    wrapper.trigger('submit')
    // emite o evento novo-lance
    const lancesEmitidos = wrapper.emitted('novo-lance')
    // espera que o lancesEmitidos tenha o tamanho 1
    expect(lancesEmitidos).toHaveLength(1)
  })
  test('emit o valor esperado de um lance valido', () => {
    // cria o componente passando a prop lanceMinimo
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    // procura o input
    const input = wrapper.find('input')
    // passa um valor para o input
    input.setValue(400)
    // aciona o evento submit
    wrapper.trigger('submit')
    // emite o evento novo-lance
    const lancesEmitidos = wrapper.emitted('novo-lance')
    // pega o valor do lance
    const valorDoLance = parseInt(lancesEmitidos[0][0])
    // espera q o valor do lance seja 400
    expect(valorDoLance).toBe(400)
  })
  test('nao sao aceitos lances com valores menores do que o minimo informado', async () => {
    // cria o componente passando a prop lanceMinimo
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    // procura o input
    const input = wrapper.find('input')
    // passa um valor para o input
    input.setValue(100)
    // aciona o evento submit
    wrapper.trigger('submit')
    // aguarda a rendirização do DOM
    await wrapper.vm.$nextTick()
    // Procura a mensagem de erro existe
    const msgErro = wrapper.find('p.alert').element.textContent
    const msgEsperada = 'O valor mínimo para o lance é de R$ 300'
    // espera que a mensagem de erro seja true
    expect(msgErro).toContain(msgEsperada)
  })
})
