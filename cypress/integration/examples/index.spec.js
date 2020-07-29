/// <reference types="cypress" />

describe('基本', () => {

  context('列表到详情,返回详情列表页被缓存', () => {

    it('用例', () => {
      cy.visit('http://192.168.1.101:8011/#/test-case/number-list')
      const divActive = cy.get('#item0')
      divActive.click()
      cy.url().should('include', 'http://192.168.1.101:8011/#/test-case/number-detail/0')
      cy.go('back').then(() => {
        cy.get('#item0').should('have.css', 'background', 'rgb(255, 215, 0) none repeat scroll 0% 0% / auto padding-box border-box')
      })
    })

  })
})
