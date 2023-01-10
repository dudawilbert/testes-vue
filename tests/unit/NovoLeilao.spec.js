import NovoLeilao from '@/views/NovoLeilao'
import { mount } from '@vue/test-utils'
import { createLeilao } from '@/http'
jest.mock('@/http')
const $router = {
  push: jest.fn()
}
describe('Um novo leilão deve ser criado', () => {
  test('dado o formulario preenchido, um leilão deve ser criado', () => {
    createLeilao.mockResolvedValueOnce()
    // mountou o componente
    const wrapper = mount(NovoLeilao, {
      mocks: {
        $router
      }
    })
    // passou valor para os inputs do formulario
    wrapper.find('.produto').setValue('Um livro da casa do codigo')
    wrapper.find('.descricao').setValue('Conteudo de primeira')
    wrapper.find('.valor').setValue(50)
    // disparou o envento submit
    wrapper.find('form').trigger('submit')
    // espera que o createLeilao foi chamado
    expect(createLeilao).toHaveBeenCalled()
  })
})
